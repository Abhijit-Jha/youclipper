import React, { useCallback, useState } from "react";
import { Button } from "./Button";
import { Download, Star } from "lucide-react";
import { useAspectRatioStore, useQualityStore, useTypeStore, useVideoIDStore, useYoutubeURLStore } from "@/app/contexts/videoContext";
import { useSession } from "next-auth/react";
import { adjustVideoQuality } from "@/app/lib/controller/adjustQuality";
import { trimmedVideoPathStore } from "@/app/contexts/pathContext";
import { useQualityJobStore } from "@/app/contexts/jobIdContext";
import { downloadClickedStore, retryQualityDownloadStore } from "@/app/contexts/extra";
import { useRouter } from "next/navigation";
import { freeTrialUsed } from "@/app/lib/controller/setTrialUsed";
import { getFreeTrialStatus } from "@/app/lib/controller/getFreeTrailStatus";
import { toast } from "sonner";
import { VideoQuality } from "@/types/video";
import { saveVideoDetails } from "@/app/lib/controller/saveVideoDetails";

// You can place this in a shared types file if you want
type DownloadOptionProps = {
    title: string;
    premium?: boolean;
    quality: VideoQuality;
    type: "audio" | "video";
    onClick?: () => void
};


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
    const { youtubeVideoURL } = useYoutubeURLStore();
    let token = session?.accessToken;
    const { downloadClicked, setDownloadClicked } = downloadClickedStore()
    const handleAdjustingQuality = useCallback(async () => {
        if(!token) return;
        if (youtubeVideoURL || token) await saveVideoDetails(youtubeVideoURL, quality, type);
        const { isPremium, isFreeTrialUsed } = await getFreeTrialStatus();
        const canDownload = isPremium || !isFreeTrialUsed;
        if (!canDownload) {
            toast("Your trial ride ends here 🛑 — Premium is your next stop! 🎟️");
            setTimeout(() => {
                router.push('/pricing');
            }, 1500);
            return;
        }

        setQualityCompleted(false);
        setQuality(quality);
        setType(type);
        setDownloadClicked(true);
        if (!trimmedVideoPath || !videoId || !token) {
            // console.log("Will retry once path is there");
            setDownloadClicked(true);
            setRetryDownload(true);
            return;
        }

        try {
            const data = await adjustVideoQuality({ trimmedVideoPath, videoId, aspectRatio, resolution: quality, token });
            const jobID = data.jobId;
            setQualityJobId(jobID);
            // console.log('Setting quality', { title, quality, aspectRatio, trimmedVideoPath });
            setDownloadClicked(false);
            await freeTrialUsed();
        } catch (error: any) {
            console.error("Error while adjusting video quality:", error?.response?.data?.message || error.message || error);
            setDownloadClicked(false);
        }
    }, [
        aspectRatio,
        freeTrialUsed,
        getFreeTrialStatus,
        quality,
        setQuality,
        setQualityCompleted,
        setQualityJobId,
        setRetryDownload,
        setDownloadClicked,
        session?.accessToken,
        type,
        trimmedVideoPath,
        videoId,
        title,
        router,
    ]);

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
