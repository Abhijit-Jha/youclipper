// http://localhost:3000/api/video/trim?startTime=00:00:00&endTime=00:00:25
import axios from "axios";
import { api } from "../apiCalls";
import { toast } from "sonner";

const BASE_URL = "http://localhost:3001/";

interface TrimVideoResponse {
    jobId: number;
    message?: string;
    [key: string]: any; // in case the backend returns more
}

export async function trimVideo(
    combinedVideoPath: string,
    videoId: string,
    startTime: string,
    endTime: string,
    token: string
): Promise<TrimVideoResponse | null> {
    const url = `${BASE_URL}${api['trimVideo']}?startTime=${startTime}&endTime=${endTime}`;
    const body = {
        combinedVideoPath,
        videoId
    };
    console.log(
        combinedVideoPath,
        videoId,
        startTime,
        endTime,
        token,
        "Hello"
    )
    try {
        const response = await axios.post<TrimVideoResponse>(url, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error trimming video: ", error?.response?.data || error.message);
        toast("Failed to start trimming. Please try again.");
        return null;
    }
}