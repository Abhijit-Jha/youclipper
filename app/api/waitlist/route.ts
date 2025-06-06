import { connectToDB } from "@/app/lib/db/connectToDb";
import { NextRequest, NextResponse } from "next/server";
import Waitlist from "@/app/lib/db/WaitlistSchema";

export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const body = await req.json();
        const email = body.email;

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        await Waitlist.create({ email });

        return NextResponse.json({ message: "Added to the waitlist" });
    } catch (error: any) {
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}
