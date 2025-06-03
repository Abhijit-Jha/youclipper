import { connectToDB } from "@/app/lib/db/connectToDb";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv"
dotenv.config()
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get('videoId');

    const request = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,statistics&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`);
    if (!request.data.items) return NextResponse.json({
        "message": "Not able to find the video",
        "status": "Not Found"
    }, { status: 404 })


    const videoDetails = request.data.items.map((data: any) => {
        const kind = data.kind;
        const etag = data.etag;
        const videoId = data.id;
        const title = data.snippet.title;
        const thumbnailUrl = data.snippet.thumbnails?.default.url;
        const stats = data.statistics;
        const duration = data.contentDetails.duration;
        return {
            kind,
            etag,
            videoId,
            title,
            thumbnailUrl,
            stats,
            duration
        }

    })
    return NextResponse.json({
        videoDetails: videoDetails,
        status: "OK"
    }, { status: 200 });
}