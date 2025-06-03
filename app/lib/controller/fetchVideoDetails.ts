import axios from "axios";

export async function getVideoDetails(videoId: string) {
    return await axios.get(`/api/videoDetails?videoId=${videoId}`);
}