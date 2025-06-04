"use client";

import { useState } from "react";
import { getVideoDetails } from "../lib/controller/fetchVideoDetails";
import { parseISODurationToSeconds } from "../lib/utils/handleTimeUnits";
import { VideoInput } from "../component/VideoInput";
import { VideoClipper } from "../component/VideoClipper";
import axios from "axios";
import { useEffect } from "react";
import { startDownload } from "../lib/controller/startDownload";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCombineJobStore, useDownloadJobStore } from "../contexts/jobIdContext";
import { getJobStatus } from "../lib/controller/polling";
import { combinedVideoPathStore } from "../contexts/pathContext";


export default function ClipPage() {
    const { downloadJobId, downloadCompleted, setDownloadCompleted, setDownloadJobId } = useDownloadJobStore();
    const { combineCompleted, setCombineCompleted } = useCombineJobStore();
    const { setCombinedVideoPath } = combinedVideoPathStore()
    const [videoId, setVideoId] = useState<string | null>(null);
    const router = useRouter()
    const [videoDetails, setVideoDetails] = useState<{
        duration: number;
    } | null>(null);
    const { data: session, status } = useSession();
    const isPremiumUser = session?.user.isPremium;
    const isFreeTrialUsed = session?.user.isFreeTrialUsed ?? true;
    const token = session?.accessToken;
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);


    //TODO genralize it using startPolling.ts
    //To poll the download Progress
    useEffect(() => {
        // Only start polling if jobId and token are valid
        if (!downloadJobId || !token) return;

        const timer = setInterval(async () => {
            try {
                // If already marked in progress, skip this poll iteration
                if (combineCompleted) return;

                const data = await getJobStatus("download", downloadJobId, token);

                if (data.state === 'completed') {
                    setDownloadCompleted(true);
                    clearInterval(timer); // stop polling
                    //store the video and audio path to combine ->No need because backend handle this 
                    console.log("Download completed:", data);
                } else if (data.state === 'failed') {
                    console.log("Download failed:", data);
                    clearInterval(timer); // stop polling on failure too
                } else {
                    console.log("Download in progress:", data);
                }
            } catch (error) {
                console.error("Error while polling Trim status:", error);
                // You can decide to clearInterval here or continue retrying
                // clearInterval(timer);
            }
        }, 5000);

        return () => clearInterval(timer); // clean up on component unmount or deps change
    }, [downloadJobId, token, downloadCompleted]);

    //To poll for the combineProgress
    
    useEffect(() => {
        // Downloading is not done so we will not check for combine progress
        if (!downloadCompleted) return;
        if (!token) return;

        const timer = setInterval(async () => {
            try {
                // combineId is same as downloadID
                const data = await getJobStatus("combine", downloadJobId, token);
                console.log("Combine progress:", data);

                if (data.state === 'completed') {
                    setCombineCompleted(true);
                    clearInterval(timer);
                    //Store the combined output path for trimming
                    console.log(data.progress.outputPath)
                    setCombinedVideoPath(data.progress.outputPath);
                    console.log("Combine completed:", data);
                } else if (data.state === 'failed') {
                    console.log("Combine failed:", data);
                    clearInterval(timer);
                }
            } catch (error) {
                console.error("Error while polling combine status:", error);
                //LATER CALL :decide to clearInterval here or continue retrying
            }
        }, 5000);

        return () => clearInterval(timer); 
    }, [downloadCompleted, downloadJobId, token]);

    const handleVideoSubmit = async (youtubeVideoURL: string, videoId: string) => {
        try {
            const response = await getVideoDetails(videoId);
            const video = response.data.videoDetails[0];
            const durationInSeconds = parseISODurationToSeconds(video.duration);
            console.log(video, "Video details");
            setVideoId(videoId);
            setVideoDetails({
                duration: durationInSeconds,
            });
            // Here we have videoURL and videoId and we have to make call to the /startdownload api to 
            // start the download but check if they have trial or not
            // if the user is not a premium user and the free trial is also used no calls to the backend
            // only if the user is premuim and freeTrial is not used then only call the backend
            if (isPremiumUser || !isFreeTrialUsed) {
                const data = await startDownload(youtubeVideoURL, token);
                const jobId = data.jobId //To poll for the status
                setDownloadJobId(jobId);
                console.log("Job is scheduled ", jobId)
            } else {
                console.log("No trials left!!! So No reqiests will be sent");
            }

        } catch (error) {
            console.error("Failed to fetch video details:", error);
            alert("Failed to fetch video details. Please try again.");
        }
    };

    return (
        <div className="relative z-10 container mx-auto px-4 py-16">
            {!videoId || !videoDetails ? (
                <div className="flex  h-fit items-center mt-20">
                    <VideoInput onVideoSubmit={handleVideoSubmit} />
                </div>
            ) : (
                <VideoClipper
                    videoId={videoId}
                    duration={videoDetails.duration}
                    onBack={() => {
                        setVideoId(null);
                        setVideoDetails(null);
                    }}
                />
            )}
        </div>
    );
}