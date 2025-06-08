
import { JWT } from "next-auth/jwt";
import axios from "axios";
import { api } from "../apiCalls";
import dotenv from "dotenv"
dotenv.config()
const NEXT_PUBLIC_NODE_BACKEND_URL = process.env.NEXT_PUBLIC_NODE_BACKEND_URL!;

export async function getJobStatus(
    jobType: "download" | "combine" | "trim" | "quality",
    jobId: number,
    token: string
) {
    let endpoint = "";
    switch (jobType) {
        case "download":
            endpoint = api["downloadStatus"];
            break;
        case "combine":
            endpoint = api["combineStatus"];
            break;
        case "trim":
            endpoint = api["trimStatus"];
            break;
        case "quality":
            endpoint = api["qualityStatus"];
            break;
        default:
            throw new Error("Invalid job type");
    }

    const url = `${NEXT_PUBLIC_NODE_BACKEND_URL}${endpoint}${jobId}`;
    console.log("url is ", url);

    try {
        const req = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return req.data;
    } catch (error) {
        console.error(`Failed to get ${jobType} status for job ${jobId}:`, error);
        throw error;
    }
}
