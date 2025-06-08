import { DownloadType, VideoQuality } from "@/types/video";

type DownloadOption = {
    title: string;
    resolution: string;
    premium: boolean;
    quality: VideoQuality
    type: DownloadType
};

export const downloadOptions: DownloadOption[] = [
    { title: "Video / 144p", resolution: "256×144", premium: false, quality: "144p", type: "video" },
    { title: "Video / 360p", resolution: "640×360", premium: false, quality: "360p", type: "video" },
    { title: "Video / 720p", resolution: "1280×720", premium: true, quality: "720p", type: "video" },
    { title: "Video / 1080p", resolution: "1920×1080", premium: true, quality: "1080p", type: "video" },
    { title: "Audio", resolution: "—", premium: false, quality: "audio", type: "audio" },
];
