import { create } from 'zustand';
import { formatSecondsToHHMMSS } from '../lib/utils/handleTimeUnits';

//Yt url
interface YoutubeURLStore {
    youtubeVideoURL: string;
    setYoutubeVideoURL: (url: string) => void;
    clearYoutubeVideoURL: () => void;
}

export const useYoutubeURLStore = create<YoutubeURLStore>((set) => ({
    youtubeVideoURL: "",
    setYoutubeVideoURL: (url) => set({ youtubeVideoURL: url }),
    clearYoutubeVideoURL: () => set({ youtubeVideoURL: "" }),
}));


//videoId
interface VideoIDStore {
    videoId: string;
    setVideoID: (videoId: string) => void;
    clearVideoID: () => void;
}

export const useVideoIDStore = create<VideoIDStore>((set) => ({
    videoId: "",
    setVideoID: (videoId) => set({ videoId: videoId }),
    clearVideoID: () => set({ videoId: "" }),
}));

// start and end time
interface ClippingWindowState {
    startTime: string;
    endTime: string;
    setStartTime: (val: string) => void;
    setEndTime: (val: string) => void;
    resetTimes: (duration: number) => void;
}

export const useClippingWindowStore = create<ClippingWindowState>((set) => ({
    startTime: "00:00:00",
    endTime: "00:00:00",

    setStartTime: (val) => set({ startTime: val }),
    setEndTime: (val) => set({ endTime: val }),

    resetTimes: (duration: number) =>
        set({
            startTime: "00:00:00",
            endTime: formatSecondsToHHMMSS(duration),
        }),
}));

//aspect Ratio
type AspectRatio = 'fullscreen' | 'reels' | 'squared';

interface AspectRatioState {
    aspectRatio: AspectRatio;
    setAspectRatio: (val: AspectRatio) => void;
    resetAspectRatio: () => void;
}

export const useAspectRatioStore = create<AspectRatioState>((set) => ({
    aspectRatio: "fullscreen",

    setAspectRatio: (val) => set({ aspectRatio: val }),

    resetAspectRatio: () => set({ aspectRatio: "fullscreen" }),
}));


// Quality - 360p default 1080 720....
type VideoQuality = '360p' | '720p' | '1080p' | '144p' | 'audio';

interface QualityState {
    quality: VideoQuality;
    setQuality: (val: VideoQuality) => void;
    resetQuality: () => void;
}

export const useQualityStore = create<QualityState>((set) => ({
    quality: '360p',

    setQuality: (val) => set({ quality: val }),

    resetQuality: () => set({ quality: '360p' }),
}));

//Type of 
type DownloadType = "audio" | "video";

interface TypeStore {
    type: DownloadType;
    setType: (val: DownloadType) => void;
    reset: () => void;
}

export const useTypeStore = create<TypeStore>((set) => ({
    type: "video",

    setType: (val) => set({ type: val }),

    reset: () => set({ type: "video" }),
}));