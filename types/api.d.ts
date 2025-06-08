export interface AdjustVideoQualityParams {
    trimmedVideoPath: string;
    videoId: string;
    aspectRatio: string;
    resolution: string;
    token: string;
}


export interface QueueStatusResponse {
    currentWaitingJobs: number;
    statusOfYourJob: "waiting" | "active" | "completed" | string;
    qualityJobStatus?: "waiting" | "active" | "completed" | "failed" | "not found" | string;
}


export interface TrimVideoResponse {
    jobId: number;
    message?: string;
    [key: string]: any; // in case the backend returns more
}
