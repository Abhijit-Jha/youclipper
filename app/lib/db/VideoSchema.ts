import mongoose, { Schema, Model } from "mongoose";

interface Video {
    name: string;
    email: string;
    videoURL?: string;  // Now an array of strings
    image?: string;
    quality?: string,
    type?: string
}

const videoSchema = new Schema<Video>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        videoURL: { type: String },  // Array of strings
        image: { type: String, required: false },
        quality: { type: String },
        type: { type: String, required: false },

    },
    { timestamps: true }
);

const video: Model<Video> = mongoose.models.videoDB || mongoose.model<Video>("videoDB", videoSchema);
export default video;
