import axios, { AxiosResponse } from "axios";
import { JWT } from "next-auth/jwt";

// Define the expected response structure
interface QueueStatusResponse {
    currentWaitingJobs: number;
    statusOfYourJob: "waiting" | "active" | "completed" | string;
    qualityJobStatus?: "waiting" | "active" | "completed" | "failed" | "not found" | string;
}

const BASE_URL = 'http://localhost:3001/';

export async function trackQueue(
    jobId: number,
    qualityJobId: number | null,
    token: JWT
): Promise<QueueStatusResponse> {
    const url = `${BASE_URL}api/queue/status/${jobId}`;
    const body = {
        qualityJobId: qualityJobId || null,
    };

    try {
        const resp: AxiosResponse<QueueStatusResponse> = await axios.post(url, body, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return resp.data;
    } catch (error: any) {
        console.error("Error tracking queue:", error.response?.data || error.message);

        throw new Error(
            error.response?.data?.error || "Failed to track queue status"
        );
    }
}
