import { QueueStatusResponse } from "@/types/api";
import axios, { AxiosResponse } from "axios";
import { JWT } from "next-auth/jwt";

import dotenv from "dotenv"
dotenv.config()
const NEXT_PUBLIC_NODE_BACKEND_URL = process.env.NEXT_PUBLIC_NODE_BACKEND_URL!;

export async function trackQueue(
    jobId: number,
    qualityJobId: number | null,
    token: JWT
): Promise<QueueStatusResponse> {
    const url = `${NEXT_PUBLIC_NODE_BACKEND_URL}/api/queue/status/${jobId}`;
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
