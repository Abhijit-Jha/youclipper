import axios from "axios";
import { api } from "../apiCalls";
import dotenv from 'dotenv';
dotenv.config();
export async function startDownload(youtubeVideoURL: string, token: string) {
    const BASE_URL = process.env.BACKEND_URL!
    const url = `http://localhost:3001${api["startDownload"]}`;
    console.log("url i s", url);
    try {
        const response = await axios.post(url, { youtubeURL : youtubeVideoURL }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: any) {
        // Optional: Log the error or send to logging service
        console.error("Download start failed:", error);

        // Optional: Customize returned error
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data?.message || "Server error",
            };
        }

        return {
            success: false,
            message: "Unexpected error occurred",
        };
    }
}
