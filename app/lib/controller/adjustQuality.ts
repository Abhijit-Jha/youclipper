import { AdjustVideoQualityParams } from "@/types/api";
import axios from "axios";
import dotenv from "dotenv"
import { api } from "../apiCalls";
dotenv.config()
const NEXT_PUBLIC_NODE_BACKEND_URL = process.env.NEXT_PUBLIC_NODE_BACKEND_URL!;


export async function adjustVideoQuality({
    trimmedVideoPath,
    videoId,
    aspectRatio,
    resolution,
    token,
}: AdjustVideoQualityParams) {
    console.log({ resolution, aspectRatio })
    const url = `${NEXT_PUBLIC_NODE_BACKEND_URL}${api['quality']}?resolution=${resolution}&aspectRatio=${aspectRatio}`;
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

