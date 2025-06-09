import axios from "axios";
import { api } from "../apiCalls";
import dotenv from 'dotenv';
dotenv.config()
const NEXT_PUBLIC_NODE_BACKEND_URL = process.env.NEXT_PUBLIC_NODE_BACKEND_URL!;
export async function startDownload(youtubeVideoURL: string, token: string) {

    const url = `${NEXT_PUBLIC_NODE_BACKEND_URL}${api["startDownload"]}`;
    // console.log("url is", url);

    try {
        const response = await axios.post(
            url,
            { youtubeURL: youtubeVideoURL },
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
                timeout: 5000, //prevent hanging forever
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("Download start failed:", error);

        if (axios.isAxiosError(error)) {
            // Check if server is down (no response received)
            if (!error.response) {
                return {
                    success: false,
                    message: "Backend server is down or unreachable.",
                };
            }

            return {
                success: false,
                message: error.response.data?.message || "Server error occurred.",
            };
        }

        return {
            success: false,
            message: "Unexpected error occurred.",
        };
    }
}
