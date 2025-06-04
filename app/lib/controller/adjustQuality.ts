import axios, { AxiosResponse } from "axios";
import { JWT } from "next-auth/jwt";

const BASE_URL = 'http://localhost:3001/';

interface AdjustVideoQualityParams {
    trimmedVideoPath: string;
    videoId: string;
    aspectRatio: string;
    resolution: string;
    token: JWT;
}


export async function adjustVideoQuality({
    trimmedVideoPath,
    videoId,
    aspectRatio,
    resolution,
    token,
}: AdjustVideoQualityParams) {
    console.log({resolution,aspectRatio})
    const url = `${BASE_URL}api/video/quality?resolution=${resolution}&aspectRatio=${aspectRatio}`;
    const body = {
        trimmedVideoPath,
        videoId,
    };

    try {
        const response = await axios.post(url, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error adjusting video quality:", error);

        return {
            success: false,
            message: error.response?.data?.message || "Something went wrong during video quality adjustment.",
        };
    }
}

