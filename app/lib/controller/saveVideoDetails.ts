import { DownloadType, VideoQuality } from "@/types/video";
import axios from "axios";

export async function saveVideoDetails(videoURL: string, quality: VideoQuality, type: DownloadType) {
    await axios.post('/api/download', {
        videoURL,
        quality,
        type
    });
}