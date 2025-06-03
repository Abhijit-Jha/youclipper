"use client";
import { useEffect, useState } from "react";
import { convertHHMMSSToSeconds, formatSecondsToHHMMSS } from "../lib/utils/handleTimeUnits";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { AspectRatioSelector } from "./ui/DropDown";
import DownloadOption from "./ui/DownloadOption";
import { ArrowLeft } from "lucide-react";
import { useAspectRatioStore, useClippingWindowStore } from "../contexts/videoContext";

interface VideoClipperProps {
    videoId: string;
    duration: number;
    onBack: () => void;
}

type DownloadType = "audio" | "video";

type VideoQuality =
    | "144p"
    | "360p"
    | "720p"
    | "1080p"
    | "audio";

interface DownloadOption {
    title: string;
    resolution: string;
    premium: boolean;
    quality: VideoQuality;
    type: DownloadType;
}

export const VideoClipper = ({ videoId, duration, onBack }: VideoClipperProps) => {
    // const [clippingWindow, setClippingWindow] = useState({
    //     startTime: "00:00:00",
    //     endTime: formatSecondsToHHMMSS(duration)
    // });
    const { startTime, endTime, setStartTime, setEndTime } = useClippingWindowStore();
    const { aspectRatio, setAspectRatio } = useAspectRatioStore()
    // const [aspectRatio, setAspectRatio] = useState("fullscreen");
    const [clipType, setClipType] = useState("Fullscreen");
    const [isDownloadOpen, setIsDownloadOpen] = useState(false);
    const downloadOptions: DownloadOption[] = [
        { title: "Video / 144p", resolution: "256×144", premium: false, quality: "144p", type: "video" },
        { title: "Video / 360p", resolution: "640×360", premium: false, quality: "360p", type: "video" },
        { title: "Video / 720p", resolution: "1280×720", premium: true, quality: "720p", type: "video" },
        { title: "Video / 1080p", resolution: "1920×1080", premium: true, quality: "1080p", type: "video" },
        { title: "Video / 1080p", resolution: "1920×1080", premium: true, quality: "1080p", type: "video" },
        { title: "Video / 1080p", resolution: "1920×1080", premium: true, quality: "1080p", type: "video" },
        { title: "Audio Only", resolution: "—", premium: false, quality: "audio", type: "audio" }
    ];

    const handleDownload = () => {
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


        console.log("Downloading clip:", { videoId, startTime, endTime });
        setIsDownloadOpen(true);
    };
    //First Time -> End time  = duration
    useEffect(() => {
        setEndTime(formatSecondsToHHMMSS(duration));
    }, [])
    return (
        <div className="glass-card p-8 max-w-4xl w-full mx-auto space-y-6">
            {!isDownloadOpen ? (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={isDownloadOpen ? () => setIsDownloadOpen(false) : onBack} />
                        <h2 className="md:text-2xl sm:text-xl text-md font-bold ">Create Your Clip</h2>
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
                                onChange={(e) => setStartTime(e.target.value)}
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
                                onChange={(e) => setEndTime(e.target.value)}
                                min="00:00:00"
                                max={formatSecondsToHHMMSS(duration)}
                                className="bg-background/50"
                            />
                        </div>

                        <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button onClick={handleDownload}>Download Clip</Button>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <ArrowLeft className="cursor-pointer" onClick={() => setIsDownloadOpen(false)} />
                        <h2 className="md:text-2xl text-xl font-bold">Download</h2>
                        <div style={{ width: "" }}></div>
                    </div>
                    <div className="max-h-96 overflow-y-scroll overflow-x-hidden space-y-4">
                        {downloadOptions.map((data, index) => (
                            <DownloadOption key={index} title={data.title} premium={data.premium} quality={data.quality} type={data.type} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
