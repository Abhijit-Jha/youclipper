import { create } from "zustand";

// Retry Download Store
interface RetryDownload {
    retryDownload: boolean;
    setRetryDownload: (flag: boolean) => void;
}

// Download Clicked Store 
interface DownloadClicked {
    downloadClicked: boolean;
    setDownloadClicked: (flag: boolean) => void;
}

// Steps Store
interface StepsStore {
    stepNo: number;
    setStep: (step: number) => void;
}


// Download URL Store
interface DownloadURLState {
    downloadURL: string;
    setDownloadURL: (url: string) => void;
}

// Queue Status Store
interface QueueStatusStore {
    currentWaitingJobs: number;
    statusOfYourJob: string;
    setQueueStatus: (jobs: number, status: string) => void;
}

export const retryQualityDownloadStore = create<RetryDownload>((set) => ({
    retryDownload: false,
    setRetryDownload: (flag) => set({ retryDownload: flag }),
}));


export const downloadClickedStore = create<DownloadClicked>((set) => ({
    downloadClicked: false,
    setDownloadClicked: (flag) => set({ downloadClicked: flag }),
}));


export const useStepsStore = create<StepsStore>((set) => ({
    stepNo: 0,
    setStep: (step) => set({ stepNo: step }),
}));


export const downloadURLStore = create<DownloadURLState>((set) => ({
    downloadURL: "",
    setDownloadURL: (url) => set({ downloadURL: url }),
}));


export const useQueueStatusStore = create<QueueStatusStore>((set) => ({
    currentWaitingJobs: 0,
    statusOfYourJob: "waiting",
    setQueueStatus: (jobs, status) => set({ currentWaitingJobs: jobs, statusOfYourJob: status }),
}));
