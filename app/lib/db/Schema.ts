import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    image?: string;
    emailVerified?: Date | null;
    isPremium?: boolean;
    isFreeTrialUsed?: boolean
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: false },
    emailVerified: { type: Date, required: false, default: null },
    isPremium: { type: Boolean, default: false },
    isFreeTrialUsed: { type: Boolean, default: false }
});


const User: Model<IUser> = mongoose.models.UserDB || mongoose.model<IUser>("UserDB", userSchema);
export default User;
