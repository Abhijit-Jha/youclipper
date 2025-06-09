import { connectToDB } from "@/app/lib/db/connectToDb";
import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv"
import { getServerSession } from "next-auth";
import User from "@/app/lib/db/Schema";
import { authOptions } from "../auth";
import video from "@/app/lib/db/VideoSchema";
dotenv.config();

export async function POST(req: NextRequest) {
    await connectToDB();
    const { videoURL, quality, type } = await req.json()
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return NextResponse.json({
            message: "Unauthorized",
            success: false,
        }, { status: 401 });
    }


    await video.create(
        {
            email: session.user.email,
            videoURL,
            name: session.user.name,
            image: session.user.image,
            quality,
            type
        }
    );

    return NextResponse.json({
        message: "Done",
        success: true,
    });
}
