import { JWT } from "next-auth/jwt";
import { getJobStatus } from "./polling";


export const startPollingJob = (type: "download" | "combine", jobId: number, token: string, onComplete: (data: any) => void) => {
    const timer = setInterval(async () => {
        try {
            const data = await getJobStatus(type, jobId, token);
            if (data.state === "completed") {
                onComplete(data);
                clearInterval(timer);
            } else if (data.state === "failed") {
                console.error(`${type} job failed:`, data);
                clearInterval(timer);
            } else {
                console.log(`${type} job in progress:`, data);
            }
        } catch (error) {
            console.error(`Error polling ${type} job:`, error);
        }
    }, 5000);

    return () => clearInterval(timer);
};
