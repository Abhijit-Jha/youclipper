import { connectToDB } from "@/app/lib/db/connectToDb";
import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import User from "@/app/lib/db/Schema";

dotenv.config();

export async function POST(req: NextRequest) {
  await connectToDB();

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { message: "Unauthorized", success: false },
      { status: 401 }
    );
  }

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return NextResponse.json(
      { message: "User Not Found", success: false },
      { status: 404 }
    );
  }

  return NextResponse.json({
    isFreeTrialUsed: user.isFreeTrialUsed,
    isPremium: user.isPremium,
    success: true,
  });
}
