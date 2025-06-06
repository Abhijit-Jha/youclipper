import { create } from "zustand";

interface CombinedVideoPathStore {
    combinedVideoPath: string;
    setCombinedVideoPath: (path: string) => void;
    clearCombinedVideoPath: () => void;
}

interface TrimmedVideoPathStore {
    trimmedVideoPath: string;
    setTrimmedVideoPath: (path: string) => void;
    clearTrimmedVideoPath: () => void;
}

interface FinalVideoPathStore {
    finalVideoPath: string;
    setFinalVideoPath: (path: string) => void;
    clearFinalVideoPath: () => void;
}
export const combinedVideoPathStore = create<CombinedVideoPathStore>((set) => ({
    combinedVideoPath: "",
    setCombinedVideoPath: (path) => set({ combinedVideoPath: path }),
    clearCombinedVideoPath: () => set({ combinedVideoPath: "" }),
}));



export const trimmedVideoPathStore = create<TrimmedVideoPathStore>((set) => ({
    trimmedVideoPath: "",
    setTrimmedVideoPath: (path) => set({ trimmedVideoPath: path }),
    clearTrimmedVideoPath: () => set({ trimmedVideoPath: "" }),
}));


export const finalVideoPathStore = create<FinalVideoPathStore>((set) => ({
    finalVideoPath: "",
    setFinalVideoPath: (path) => set({ finalVideoPath: path }),
    clearFinalVideoPath: () => set({ finalVideoPath: "" }),
}));