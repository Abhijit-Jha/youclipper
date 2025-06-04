import { create } from "zustand";

interface RetryDownload {
    retryDownload: boolean;
    setRetryDownload: (flag: boolean) => void;
}

export const retryQualityDownloadStore = create<RetryDownload>((set) => ({
    retryDownload: false,
    setRetryDownload: (flag) => set({ retryDownload: flag }),
}));
