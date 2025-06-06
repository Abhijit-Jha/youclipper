import mongoose, { Schema, Document, Model } from "mongoose";

export interface WaitList {
    email: string;
}
const waitlistSchema = new Schema<WaitList>({
    email: { type: String, required: true, unique: true },
}, { timestamps: true });

const Waitlist: Model<WaitList> = mongoose.models.Waitlist || mongoose.model<WaitList>("Waitlist", waitlistSchema);
export default Waitlist;
