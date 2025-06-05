"use client";

import { useEffect, useState } from "react";
import { convertHHMMSSToSeconds, formatSecondsToHHMMSS } from "../lib/utils/handleTimeUnits";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { AspectRatioSelector } from "./ui/DropDown";
import DownloadOption from "./ui/DownloadOption";
import { ArrowLeft } from "lucide-react";
import { useAspectRatioStore, useClippingWindowStore, useQualityStore } from "../contexts/videoContext";
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

interface VideoClipperProps {
    videoId: string;
    duration: number;
    onBack: () => void;
}

type DownloadType = "audio" | "video";

type VideoQuality = "144p" | "360p" | "720p" | "1080p" | "audio";

interface DownloadOption {
    title: string;
    resolution: string;
    premium: boolean;
    quality: VideoQuality;
    type: DownloadType;
}

export const VideoClipper = ({ videoId, duration, onBack }: VideoClipperProps) => {
    const { startTime, endTime, setStartTime, setEndTime } = useClippingWindowStore();
    const { aspectRatio, setAspectRatio } = useAspectRatioStore();
    const { combineCompleted } = useCombineJobStore();
    const [retry, setRetry] = useState<boolean>(false);
    const [clipType, setClipType] = useState("Fullscreen");
    const [isDownloadOpen, setIsDownloadOpen] = useState(false);
    const { combinedVideoPath } = combinedVideoPathStore();
    const { trimmedVideoPath, setTrimmedVideoPath } = trimmedVideoPathStore();
    const { data: session } = useSession();
    const { downloadCompleted } = useDownloadJobStore();
    const { trimJobId, setTrimJobId, trimCompleted, setTrimCompleted } = useTrimJobStore();
    const token = session?.accessToken;
    const { setStep } = useStepsStore();
    const [isTrimming, setIsTrimming] = useState(false);
    const { downloadClicked } = downloadClickedStore();
    const { stepNo } = useStepsStore();
    const router = useRouter();

    const downloadOptions: DownloadOption[] = [
        { title: "Video / 144p", resolution: "256×144", premium: false, quality: "144p", type: "video" },
        { title: "Video / 360p", resolution: "640×360", premium: false, quality: "360p", type: "video" },
        { title: "Video / 720p", resolution: "1280×720", premium: true, quality: "720p", type: "video" },
        { title: "Video / 1080p", resolution: "1920×1080", premium: true, quality: "1080p", type: "video" },
        { title: "Audio", resolution: "—", premium: false, quality: "audio", type: "audio" },
    ];


    const loadingStates = [
        { text: "Preparing everything for you..." },
        { text: "Downloading high-quality video and audio 🎥🔊" },
        { text: "Merging audio and video into one seamless file 🎬" },
        { text: "Trimming the video to your selected timeframe ✂️" },
        { text: "Optimizing video resolution for the best performance ⚙️" },
        { text: "Finalizing everything — hang tight ⏳" },
        { text: "All set! Your download will begin shortly ⬇️" },
    ];

    const [retryAttempts, setRetryAttempts] = useState(0);
    const { qualityJobId, qualityCompleted, setQualityCompleted, setQualityJobId } = useQualityJobStore();
    const { finalVideoPath, setFinalVideoPath } = finalVideoPathStore();
    const { quality } = useQualityStore()
    const { retryDownload, setRetryDownload } = retryQualityDownloadStore();
    const { downloadURL, setDownloadURL } = downloadURLStore()

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
    }, [downloadURL]);

    useEffect(() => {
        if (!retryDownload || qualityCompleted || !trimmedVideoPath) return;

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
        if (!qualityJobId || !combineCompleted || !trimCompleted || qualityCompleted || !trimmedVideoPath) return;

        const timer = setInterval(async () => {
            try {
                const data = await getJobStatus("quality", qualityJobId, token);
                console.log("Your data is ", data);
                if (data.state === 'completed') {
                    setStep(5); //4.quality job done -> 5. TP
                    const url = getFileDownloadUrl(data.progress.fileId);
                    setDownloadURL(url);
                    setStep(6);
                    setQualityCompleted(true);
                    clearInterval(timer);
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
                    console.log("Trim completed:", data);
                    console.log("The Trimmed VIdeo Path is ", data.progress.trimmedVideoPath);
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
        setIsTrimming(true); // show loader
        const startTimeInSec = convertHHMMSSToSeconds(startTime);
        const endTimeInSec = convertHHMMSSToSeconds(endTime);

        if (startTimeInSec > endTimeInSec) {
            alert("Start time cannot be greater than end time");
            return;
        }

        if (endTimeInSec - startTimeInSec < 15) {
            alert("Clip must be at least 15 seconds long");
            return;
        }

        // If end time exceeds total duration of video
        if (endTimeInSec > duration) {
            alert("End time cannot be greater than video duration");
            return;
        }

        // If start time is less than 0
        if (startTimeInSec < 0) {
            alert("Start time cannot be negative");
            return;
        }

        //Here we have to first check weather the combine process is done or not
        //Then send request for 

        //First check if the combined step  is done or not
        if (!combineCompleted || !combinedVideoPath) {
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
    };

    //First Time -> End time  = duration
    useEffect(() => {
        setEndTime(formatSecondsToHHMMSS(duration));
    }, [duration, setEndTime]);

    useEffect(() => {
        if (stepNo == 7) setTimeout(() => router.push('/'), 2000);
    }, [stepNo])

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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Start Time</label>
                            <Input
                                type="time"
                                step="1"
                                value={startTime}
                                onChange={(e) => {
                                    setTrimCompleted(false); //startTime changed so wapas trim krna pdega
                                    setStartTime(e.target.value);
                                    setTrimmedVideoPath("");
                                }}
                                min="00:00:00"
                                max={formatSecondsToHHMMSS(duration)}
                                className="bg-background/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">End Time</label>
                            <Input
                                type="time"
                                step="1"
                                value={endTime}
                                onChange={(e) => {
                                    setEndTime(e.target.value)
                                    setTrimCompleted(false); //endTime changed so wapas trim krna pdega
                                    setTrimmedVideoPath("");
                                }}
                                min="00:00:00"
                                max={formatSecondsToHHMMSS(duration)}
                                className="bg-background/50"
                            />
                        </div>

                        <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                    </div>

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