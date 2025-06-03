import React from "react";
import { Button } from "./Button";
import { Download, Star } from "lucide-react";
import { useQualityStore, useTypeStore } from "@/app/contexts/videoContext";

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
    const { setType } = useTypeStore();
    return (
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl ">

            <div className="text-base font-medium text-foreground flex items-center gap-3">
                {!premium ? <Download className="w-5 h-5 text-white" /> : <Star className="w-5 h-5 text-primary" />}
                <span>{title}</span>
            </div>

            <div className="relative flex flex-col items-center">
                <Button className="w-full sm:w-auto flex items-center gap-2 justify-center" onClick={() => {
                    setQuality(quality);
                    setType(type)
                }}>
                    <Download className="w-4 h-4" />
                    Download
                </Button>
            </div>
        </div>
    );
};

export default DownloadOption;
