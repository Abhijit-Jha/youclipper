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


export default function ClipPage() {
    const [videoId, setVideoId] = useState<string | null>(null);
    const router = useRouter()
    const [videoDetails, setVideoDetails] = useState<{
        duration: number;
    } | null>(null);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    const isPremiumUser = session?.user.isPremium;
    const isFreeTrialUsed = session?.user.isFreeTrialUsed ?? true;
    const token = session?.accessToken;
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
            //start the download but check if they have trial or not
            // if the user is not a premium user and the free trial is also used no calls to the backend
            // only if the user is premuim and freeTrial is not used then only call the backend
            if (isPremiumUser || !isFreeTrialUsed) {
                const data = await startDownload(youtubeVideoURL,token);
                const jobId = data.jobId //To poll for the status
                console.log("Job is scheduled ", jobId)
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