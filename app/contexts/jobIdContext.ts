import { create } from 'zustand';

// Download Job
interface DownloadJobState {
    downloadJobId: number;
    setDownloadJobId: (id: number) => void;
    downloadCompleted: boolean;
    setDownloadCompleted: (val: boolean) => void;
}

export const useDownloadJobStore = create<DownloadJobState>((set) => ({
    downloadJobId: 0,
    setDownloadJobId: (id) => set({ downloadJobId: id }),
    downloadCompleted: false,
    setDownloadCompleted: (val) => set({ downloadCompleted: val }),
}));

// Combine Job
interface CombineJobState {
    combineCompleted: boolean;
    setCombineCompleted: (val: boolean) => void;
}

export const useCombineJobStore = create<CombineJobState>((set) => ({
    combineCompleted: false,
    setCombineCompleted: (val) => set({ combineCompleted: val }),
}));

// Trim Job
interface TrimJobState {
    trimJobId: number;
    setTrimJobId: (id: number) => void;
    trimCompleted: boolean;
    setTrimCompleted: (val: boolean) => void;
}

export const useTrimJobStore = create<TrimJobState>((set) => ({
    trimJobId: 0,
    setTrimJobId: (id) => set({ trimJobId: id }),
    trimCompleted: false,
    setTrimCompleted: (val) => set({ trimCompleted: val }),
}));

// Quality Job
interface QualityJobState {
    qualityJobId: number;
    setQualityJobId: (id: number) => void;
    qualityCompleted: boolean;
    setQualityCompleted: (val: boolean) => void;
}

export const useQualityJobStore = create<QualityJobState>((set) => ({
    qualityJobId: 0,
    setQualityJobId: (id) => set({ qualityJobId: id }),
    qualityCompleted: false,
    setQualityCompleted: (val) => set({ qualityCompleted: val }),
}));
