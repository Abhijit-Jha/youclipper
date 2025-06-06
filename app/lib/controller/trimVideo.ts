    // http://localhost:3000/api/video/trim?startTime=00:00:00&endTime=00:00:25
    import axios from "axios";
    import { api } from "../apiCalls";
    import { toast } from "sonner";
    import { TrimVideoResponse } from "@/types/api";
    import dotenv from "dotenv"
    import { useRouter } from "next/navigation";
    dotenv.config()
    const NEXT_PUBLIC_NODE_BACKEND_URL = process.env.NEXT_PUBLIC_NODE_BACKEND_URL!;
    console.log('The backend url is',NEXT_PUBLIC_NODE_BACKEND_URL);

    export async function trimVideo(
        combinedVideoPath: string,
        videoId: string,
        startTime: string,
        endTime: string,
        token: string
    ): Promise<TrimVideoResponse | null> {
        // const route = useRouter();
        const url = `${NEXT_PUBLIC_NODE_BACKEND_URL}${api['trimVideo']}?startTime=${startTime}&endTime=${endTime}`;
        console.log("Hitting th eURL ",url);
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
            setTimeout(()=>{
                // route.push('/clip');
            },1500);
            return null;
        }
    }