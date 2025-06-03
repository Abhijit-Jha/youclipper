"use client";

import { useState } from "react";
import { getVideoDetails } from "../../lib/utils/fetchVideoDetails";
import { parseISODurationToSeconds } from "../../lib/utils/handleTimeUnits";
import { VideoInput } from "../component/VideoInput";
import { VideoClipper } from "../component/VideoClipper";


export default function ClipPage() {
    const [videoId, setVideoId] = useState<string | null>(null);
    const [videoDetails, setVideoDetails] = useState<{
        duration: number;
    } | null>(null);

    const handleVideoSubmit = async (id: string) => {
        try {
            const response = await getVideoDetails(id);
            const video = response.data.videoDetails[0];
            const durationInSeconds = parseISODurationToSeconds(video.duration);

            setVideoId(id);
            setVideoDetails({
                duration: durationInSeconds,
            });
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