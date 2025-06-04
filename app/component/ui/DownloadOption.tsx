import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { Download, Star } from "lucide-react";
import { useAspectRatioStore, useQualityStore, useTypeStore, useVideoIDStore } from "@/app/contexts/videoContext";
import { useSession } from "next-auth/react";
import { useReducedMotion } from "framer-motion";
import { adjustVideoQuality } from "@/app/lib/controller/adjustQuality";
import { finalVideoPathStore, trimmedVideoPathStore } from "@/app/contexts/pathContext";
import { useCombineJobStore, useQualityJobStore, useTrimJobStore } from "@/app/contexts/jobIdContext";
import { getJobStatus } from "@/app/lib/controller/polling";
import { retryQualityDownloadStore } from "@/app/contexts/extra";

type DownloadType = "audio" | "video";
type VideoQuality = '360p' | '720p' | '1080p' | '144p' | 'audio';

interface DownloadOptionProps {
    title: string;
    premium?: boolean;
    quality: VideoQuality,
    type: DownloadType
}

const DownloadOption = ({ title, premium = false, quality, type }: DownloadOptionProps) => {
    const { setQuality } = useQualityStore();
    const { setType } = useTypeStore(); // TODO : will handle audio and video later
    const { aspectRatio } = useAspectRatioStore();
    const { qualityJobId, qualityCompleted, setQualityCompleted, setQualityJobId } = useQualityJobStore();
    const { data: session, status } = useSession();
    const { combineCompleted } = useCombineJobStore();
    const { finalVideoPath, setFinalVideoPath } = finalVideoPathStore();
    const { trimCompleted } = useTrimJobStore();
    const { trimmedVideoPath } = trimmedVideoPathStore();
    const { videoId } = useVideoIDStore();
    const { setRetryDownload } = retryQualityDownloadStore()
    let token = session?.accessToken;
    async function handleAdjustingQuality() {
        if (!trimmedVideoPath || !videoId || !token) {
            console.warn("Missing required parameters or token");
            console.log("Will retry once path is there");
            setRetryDownload(true);
            return;
        }

        try {
            const data = await adjustVideoQuality({ trimmedVideoPath, videoId, aspectRatio, resolution: quality, token });
            const jobID = data.jobId;
            setQualityJobId(jobID);
            console.log('Setting quality', { title, quality, aspectRatio, trimmedVideoPath });

            // if (!data.success) {
            //     console.error("Video quality adjustment failed:", data.message || "Unknown error");
            // }
        } catch (error: any) {
            console.error("Error while adjusting video quality:", error?.response?.data?.message || error.message || error);
        }
    }

    return (
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl ">
            <div className="text-base font-medium text-foreground flex items-center gap-3">
                {!premium ? <Download className="w-5 h-5 text-white" /> : <Star className="w-5 h-5 text-primary" />}
                <span>{title}</span>
            </div>

            <div className="relative flex flex-col items-center">
                <Button className="w-full sm:w-auto flex items-center gap-2 justify-center" onClick={() => {
                    setQualityCompleted(false); //TODO : No need ig
                    setQuality(quality);
                    setType(type);
                    handleAdjustingQuality();
                }}>
                    <Download className="w-4 h-4" />
                    Download
                </Button>
            </div>
        </div>
    );
};

export default DownloadOption;
