const BASE_URL = process.env.BACKEND_URL! || 'http://localhost:3001';
import { JWT } from "next-auth/jwt";
import axios from "axios";
import { api } from "../apiCalls";

export async function getJobStatus(
    jobType: "download" | "combine" | "trim" | "quality",
    jobId: number,
    token: JWT
) {
    let endpoint = "";
    console.log("The current job type is ",jobType);
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

    const url = `${BASE_URL}${endpoint}${jobId}`;
    console.log("url is ",url);

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
