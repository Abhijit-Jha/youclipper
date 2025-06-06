import { create } from 'zustand';
import { formatSecondsToHHMMSS } from '../lib/utils/handleTimeUnits';
import { AspectRatioOption, DownloadType, VideoQuality } from '@/types/video';

//Yt url
interface YoutubeURLStore {
    youtubeVideoURL: string;
    setYoutubeVideoURL: (url: string) => void;
    clearYoutubeVideoURL: () => void;
}

//videoId
interface VideoIDStore {
    videoId: string;
    setVideoID: (videoId: string) => void;
    clearVideoID: () => void;
}

// start and end time
interface ClippingWindowState {
    startTime: string;
    endTime: string;
    setStartTime: (val: string) => void;
    setEndTime: (val: string) => void;
    resetTimes: (duration: number) => void;
}

interface AspectRatioState {
    aspectRatio: AspectRatioOption;
    setAspectRatio: (val: AspectRatioOption) => void;
    resetAspectRatio: () => void;
}

interface QualityState {
    quality: VideoQuality;
    setQuality: (val: VideoQuality) => void;
    resetQuality: () => void;
}


interface TypeStore {
    type: DownloadType;
    setType: (val: DownloadType) => void;
    reset: () => void;
}

export const useYoutubeURLStore = create<YoutubeURLStore>((set) => ({
    youtubeVideoURL: "",
    setYoutubeVideoURL: (url) => set({ youtubeVideoURL: url }),
    clearYoutubeVideoURL: () => set({ youtubeVideoURL: "" }),
}));

export const useVideoIDStore = create<VideoIDStore>((set) => ({
    videoId: "",
    setVideoID: (videoId) => set({ videoId: videoId }),
    clearVideoID: () => set({ videoId: "" }),
}));


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


export const useAspectRatioStore = create<AspectRatioState>((set) => ({
    aspectRatio: "fullscreen",

    setAspectRatio: (val) => set({ aspectRatio: val }),

    resetAspectRatio: () => set({ aspectRatio: "fullscreen" }),
}));


export const useQualityStore = create<QualityState>((set) => ({
    quality: '360p',

    setQuality: (val) => set({ quality: val }),

    resetQuality: () => set({ quality: '360p' }),
}));


export const useTypeStore = create<TypeStore>((set) => ({
    type: "video",

    setType: (val) => set({ type: val }),

    reset: () => set({ type: "video" }),
}));