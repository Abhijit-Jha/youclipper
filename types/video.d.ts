export interface VideoClipperProps {
    videoId: string;
    duration: number;
    onBack: () => void;
}

export type DownloadType = "audio" | "video";

export type VideoQuality = "144p" | "360p" | "720p" | "1080p" | "audio";

export interface DownloadOptionType {
    title: string;
    resolution: string;
    premium: boolean;
    quality: VideoQuality;
    type: DownloadType;
}

export interface LoadingStatesType {
    text: string
}

export interface VideoInputProps {
    onVideoSubmit: (youtubeVideoURL: string, videoId: string) => void;
}



export interface AspectRatioSelectorProps {
    value: AspectRatioOption;
    // onChange: (value: AspectRatioOption) => void;
}

export type AspectRatioOption = "fullscreen" | "reels" | "squared";
