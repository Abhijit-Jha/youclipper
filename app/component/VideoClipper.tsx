"use client";

import { useEffect, useState } from "react";
import { convertHHMMSSToSeconds, formatSecondsToHHMMSS } from "../lib/utils/handleTimeUnits";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { AspectRatioSelector } from "./ui/DropDown";
import DownloadOption from "./ui/DownloadOption";
import { ArrowLeft } from "lucide-react";
import { useAspectRatioStore, useClippingWindowStore, useQualityStore, useVideoIDStore, useYoutubeURLStore } from "../contexts/videoContext";
import { trimVideo } from "../lib/controller/trimVideo";
import { combinedVideoPathStore, finalVideoPathStore, trimmedVideoPathStore } from "../contexts/pathContext";
import { useSession } from "next-auth/react";
import { useCombineJobStore, useDownloadJobStore, useQualityJobStore, useTrimJobStore } from "../contexts/jobIdContext";
import { getJobStatus } from "../lib/controller/polling";
import { downloadClickedStore, downloadURLStore, retryQualityDownloadStore, useStepsStore } from "../contexts/extra";
import { adjustVideoQuality } from "../lib/controller/adjustQuality";
import { getFileDownloadUrl } from "../lib/storage/downloadFile";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import TrimOptions from "./ui/TrimOptions";
import { freeTrialUsed } from "../lib/controller/setTrialUsed";
import { DownloadOptionType, LoadingStatesType, VideoClipperProps } from "@/types/video";

export const VideoClipper = ({ videoId, duration, onBack }: VideoClipperProps) => {
    const { startTime, endTime, setStartTime, setEndTime } = useClippingWindowStore();
    const { aspectRatio, setAspectRatio } = useAspectRatioStore();
    const { combineCompleted } = useCombineJobStore();
    const [retry, setRetry] = useState<boolean>(false);
    const [isDownloadOpen, setIsDownloadOpen] = useState(false);
    const { combinedVideoPath, setCombinedVideoPath } = combinedVideoPathStore();
    const { trimmedVideoPath, setTrimmedVideoPath } = trimmedVideoPathStore();
    const { data: session } = useSession();
    const { setCombineCompleted } = useCombineJobStore();
    const { downloadCompleted, setDownloadCompleted } = useDownloadJobStore();
    const { trimJobId, setTrimJobId, trimCompleted, setTrimCompleted } = useTrimJobStore();
    const token = session?.accessToken;
    const { setStep } = useStepsStore();
    const [isTrimming, setIsTrimming] = useState(false);
    const { downloadClicked } = downloadClickedStore();
    const { stepNo } = useStepsStore();
    const router = useRouter();

    const downloadOptions: DownloadOptionType[] = [
        { title: "Video / 144p", resolution: "256×144", premium: false, quality: "144p", type: "video" },
        { title: "Video / 360p", resolution: "640×360", premium: false, quality: "360p", type: "video" },
        { title: "Video / 720p", resolution: "1280×720", premium: true, quality: "720p", type: "video" },
        { title: "Video / 1080p", resolution: "1920×1080", premium: true, quality: "1080p", type: "video" },
        { title: "Audio", resolution: "—", premium: false, quality: "audio", type: "audio" },
    ];


    const loadingStates: LoadingStatesType[] = [
        { text: "Preparing everything for you..." },
        { text: "Downloading high-quality video and audio 🎥🔊" },
        { text: "Merging audio and video into one seamless file 🎬" },
        { text: "Trimming the video to your selected timeframe ✂️" },
        { text: "Optimizing video resolution for the best performance ⚙️" },
        { text: "Finalizing everything — hang tight ⏳" },
        { text: "All set! Your download will begin shortly ⬇️" },
    ];

    const [retryAttempts, setRetryAttempts] = useState<number>(0);
    const { qualityJobId, qualityCompleted, setQualityCompleted, setQualityJobId } = useQualityJobStore();
    const { finalVideoPath, setFinalVideoPath } = finalVideoPathStore();
    const { quality } = useQualityStore()
    const { retryDownload, setRetryDownload } = retryQualityDownloadStore();
    const { downloadURL, setDownloadURL } = downloadURLStore();
    const { setYoutubeVideoURL } = useYoutubeURLStore();
    const { setVideoID } = useVideoIDStore();
    const { setDownloadClicked } = downloadClickedStore()

    useEffect(() => {
        if (!downloadURL) return;

        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = `${videoId}-${aspectRatio}-${quality}`; // set filename here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setStep(7);
        console.log("⬇️ Download started from:", downloadURL);
        setDownloadClicked(false);
    }, [downloadURL]);

    useEffect(() => {
        if (!retryDownload || qualityCompleted || !trimmedVideoPath || !token) return;

        const retryTimeout = setTimeout(async () => {
            try {
                console.log("🔁 Retrying adjustVideoQuality...");
                const data = await adjustVideoQuality({
                    trimmedVideoPath,
                    videoId,
                    aspectRatio,
                    resolution: quality,
                    token: session?.accessToken,
                });
                await freeTrialUsed();

                const jobID = data.jobId;
                setQualityJobId(jobID);
                setRetryDownload(false);
            } catch (error) {
                console.error("Retry adjustQuality failed:", error);
            }
        }, 2000);

        return () => clearTimeout(retryTimeout);
    }, [retryDownload, qualityCompleted, trimmedVideoPath, videoId, aspectRatio, quality, session]);

    //Start polling qualityJobId for status
    useEffect(() => {
        if (!qualityJobId || !combineCompleted || !trimCompleted || qualityCompleted || !trimmedVideoPath || !token) return;

        const timer = setInterval(async () => {
            try {
                const data = await getJobStatus("quality", qualityJobId, token);
                if (data.state === 'completed') {
                    setStep(5); //4.quality job done -> 5. TP
                    const url = getFileDownloadUrl(data.progress.fileId);
                    setDownloadURL(url);
                    setStep(6);
                    setQualityCompleted(true);
                    clearInterval(timer);
                    await freeTrialUsed();
                    console.log("✅ Quality job completed:", data);
                    setFinalVideoPath(data.progress.finalVideoPath);
                } else if (data.state === 'failed') {
                    console.error("❌ Quality job failed:", data);
                    clearInterval(timer);
                } else {
                    console.log("⏳ Quality job in progress...");
                }
            } catch (error: any) {
                console.error("⚠️ Error polling quality status:", error?.response?.data?.message || error.message);
            }
        }, 5000);

        return () => clearInterval(timer);
    }, [qualityJobId, combineCompleted, trimCompleted, qualityCompleted, trimmedVideoPath]);

    useEffect(() => {
        if (!retry || !combineCompleted || !token || !videoId) return;

        const timeout = setTimeout(async () => {
            try {
                const job = await trimVideo(combinedVideoPath, videoId, startTime, endTime, token);
                if (!job || !job.jobId) {
                    console.error("Can't trim");
                    toast('There is some issue from our side');
                    return;
                }
                setTrimJobId(job.jobId);
                console.log("Retrying trim:", retryAttempts);
            } catch (err) {
                console.error("Retry trim failed:", err);
            } finally {
                setRetry(false);
            }
        }, 2000);

        return () => clearTimeout(timeout);
    }, [retry, combineCompleted, token, videoId]);

    //poll the trimmingID to check
    useEffect(() => {
        // Only start polling if jobId and token or retry is remaining are valid
        if (!trimJobId || !token || !combineCompleted || !downloadCompleted) return;

        const timer = setInterval(async () => {
            try {
                // If already marked in progress, skip this poll iteration
                if (trimCompleted) return;

                const data = await getJobStatus("trim", trimJobId, token);

                if (data.state === 'completed') {
                    setStep(4); //3. Trimming completed -> 4. Adjusting the quality
                    setTrimCompleted(true);
                    clearInterval(timer); // stop polling
                    // trimmed Path -> store
                    setTrimmedVideoPath(data.progress.trimmedVideoPath);
                } else if (data.state === 'failed') {
                    console.log("Trim failed:", data);
                    clearInterval(timer); // stop polling on failure too
                } else {
                    console.log("Trim in progress:", data);
                }
            } catch (error) {
                console.error("Error while polling Trimming status:", error);
            }
        }, 5000);

        return () => clearInterval(timer); // clean up on component unmount or deps change
    }, [token, trimJobId, retry, trimCompleted, combinedVideoPath, downloadCompleted, combineCompleted,]);

    const handleDownload = async () => {
        const startTimeInSec = convertHHMMSSToSeconds(startTime);
        const endTimeInSec = convertHHMMSSToSeconds(endTime);
        if (!startTime || !endTime) {
            toast("Check the Time before Trimming");
            return;
        }
        if (startTimeInSec > endTimeInSec) {
            toast("Start time cannot be greater than end time");
            return;
        }

        if (endTimeInSec - startTimeInSec < 15) {
            toast("Clip must be at least 15 seconds long");
            return;
        }

        // If end time exceeds total duration of video
        if (endTimeInSec > duration) {
            toast("End time cannot be greater than video duration");
            return;
        }

        // If start time is less than 0
        if (startTimeInSec < 0) {
            toast("Start time cannot be negative");
            return;
        }

        //Here we have to first check weather the combine process is done or not
        //Then send request for 

        setIsTrimming(true); // show loader
        //First check if the combined step  is done or not
        if (!combineCompleted || !combinedVideoPath || !token) {
            // retry after 5 sec
            setRetry(true);
            setIsDownloadOpen(true);
            return;
        }
        const job = await trimVideo(combinedVideoPath, videoId, startTime, endTime, token);
        if (!job || !job.jobId) {
            console.error("Cant trim!!");
            return;
        }

        setTrimJobId(job.jobId);
        setRetry(false);

        console.log("Trimming clip:", { videoId, startTime, endTime });
        setIsDownloadOpen(true);
        setIsTrimming(false);
    };

    //First Time -> End time  = duration
    useEffect(() => {
        setEndTime(formatSecondsToHHMMSS(duration));
    }, [duration, setEndTime]);

    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        if (stepNo === 7 && downloadURL) {
            const ToastContent = () => {
                const [secondsLeft, setSecondsLeft] = useState(countdown);

                useEffect(() => {
                    if (secondsLeft === 0) return;
                    const timer = setTimeout(() => {
                        setSecondsLeft(secondsLeft - 1);
                    }, 1000);
                    return () => clearTimeout(timer);
                }, [secondsLeft]);

                return (
                    <div>
                        Your Video has been downloaded.<br />
                        If not, click this link:{" "}
                        <a
                            href={downloadURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-blue-400"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Download Video
                        </a>
                        <br />
                        Redirecting you to / in {secondsLeft} sec...
                    </div>
                );
            };

            toast(<ToastContent />);

            // Reset everything
            setDownloadCompleted(false);
            setTrimCompleted(false);
            setCombinedVideoPath("");
            setTrimmedVideoPath("");
            setQualityCompleted(false);
            setFinalVideoPath("");
            setStartTime("00:00:00");
            setEndTime(formatSecondsToHHMMSS(duration));
            setDownloadURL("");
            setVideoID("");
            setYoutubeVideoURL("");
            setAspectRatio("fullscreen");

            // Redirect after 3 seconds
            setTimeout(() => {
                setStep(0);
                router.push("/");
            }, 3000);
        }
    }, [stepNo, downloadURL]);

    return (
        <div className={`${!downloadClicked ? "glass-card" : ""}  p-8 max-w-4xl w-full mx-auto space-y-6 `}>

            {!isDownloadOpen ? (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={onBack} />
                        <h2 className="md:text-2xl sm:text-xl text-md font-bold">Create Your Clip</h2>
                        <div style={{ width: "4.5rem" }}></div>
                    </div>

                    <div className="aspect-video w-full rounded-lg overflow-hidden">
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>


                    <TrimOptions duration={duration} />


                    <div className="flex justify-end pt-4">
                        <Button onClick={handleDownload} disabled={isTrimming}>
                            {isTrimming ? (
                                <div className="flex items-center gap-2">
                                    <span className="loader border-t-transparent border-white animate-spin w-4 h-4 border-2 rounded-full" />
                                    Processing...
                                </div>
                            ) : (
                                "Trim the Clip"
                            )}
                        </Button>

                    </div>
                </>
            ) : (
                <>
                    {!downloadClicked && <div className="flex items-center justify-between mb-4">
                        <ArrowLeft className="cursor-pointer" onClick={() => setIsDownloadOpen(false)} />
                        <h2 className="md:text-2xl text-xl font-bold">Download</h2>
                        <div style={{ width: "" }}></div>
                    </div>}

                    {!downloadClicked ? (
                        <div className="max-h-96 overflow-y-scroll overflow-x-hidden space-y-4">
                            {downloadOptions.map((data, index) => (
                                <DownloadOption
                                    key={index}
                                    title={data.title}
                                    premium={data.premium}
                                    quality={data.quality}
                                    type={data.type}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex  justify-center  min-h-[350px]">
                            <MultiStepLoader loadingStates={loadingStates} loading={true} step={stepNo} />
                        </div>

                    )}

                </>
            )}
        </div>
    );
};