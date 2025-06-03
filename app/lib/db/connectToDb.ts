import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(process.env.MONGO_DB_URI!, {
                bufferCommands: false,
            })
            .then((mongoose) => {
                console.log("✅ Connected to MongoDB");
                return mongoose;
            })
            .catch((err) => {
                console.error("❌ MongoDB connection error:", err);
                throw err;
            });
    }

    cached.conn = await cached.promise;
    (global as any).mongoose = cached;
    return cached.conn;
}
