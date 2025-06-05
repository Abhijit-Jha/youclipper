import React, { useState } from "react";
import { Button } from "./Button";
import { Download, Star } from "lucide-react";
import { useAspectRatioStore, useQualityStore, useTypeStore, useVideoIDStore } from "@/app/contexts/videoContext";
import { useSession } from "next-auth/react";
import { adjustVideoQuality } from "@/app/lib/controller/adjustQuality";
import { trimmedVideoPathStore } from "@/app/contexts/pathContext";
import { useQualityJobStore } from "@/app/contexts/jobIdContext";
import { downloadClickedStore, retryQualityDownloadStore, useStepsStore } from "@/app/contexts/extra";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { useRouter } from "next/navigation";

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
    const { setQualityCompleted, setQualityJobId } = useQualityJobStore();
    const { data: session } = useSession();
    const { trimmedVideoPath } = trimmedVideoPathStore();
    const { videoId } = useVideoIDStore();
    const { setRetryDownload } = retryQualityDownloadStore();
    const router = useRouter();
    let token = session?.accessToken;
    const { downloadClicked, setDownloadClicked } = downloadClickedStore()
    async function handleAdjustingQuality() {
        const canDownload = session?.user.isPremium || !session?.user.isFreeTrialUsed;
        if (!canDownload) {
            router.push('/pricing');
            return;
        }
        setQualityCompleted(false);
        setQuality(quality);
        setType(type);
        setDownloadClicked(true);
        if (!trimmedVideoPath || !videoId || !token) {
            console.log("Will retry once path is there");
            setRetryDownload(true);
            return;
        }

        try {
            const data = await adjustVideoQuality({ trimmedVideoPath, videoId, aspectRatio, resolution: quality, token });
            const jobID = data.jobId;
            setQualityJobId(jobID);
            console.log('Setting quality', { title, quality, aspectRatio, trimmedVideoPath });
            setDownloadClicked(false);
        } catch (error: any) {
            console.error("Error while adjusting video quality:", error?.response?.data?.message || error.message || error);
            setDownloadClicked(false);
        }
    }

    return (
        <>
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl ">
                <div className="text-base font-medium text-foreground flex items-center gap-3">
                    {!premium ? <Download className="w-5 h-5 text-white" /> : <Star className="w-5 h-5 text-primary" />}
                    <span>{title}</span>
                </div>

                <Button
                    className="w-full sm:w-auto flex items-center gap-2 justify-center"
                    disabled={downloadClicked}
                    onClick={() => {
                        handleAdjustingQuality();
                    }}
                >
                    {/* Should Remove */}
                    {downloadClicked ? (
                        <>
                            <div className="loader border-t-transparent border-white animate-spin w-4 h-4 border-2 rounded-full" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <Download className="w-4 h-4" />
                            Download
                        </>
                    )}
                </Button>

            </div>

        </>
    );
};

export default DownloadOption;
