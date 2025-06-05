import { Client, Storage } from 'appwrite';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APP_WRITE_API_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APP_WRITE_PROJECT_ID!);

const storage = new Storage(client);

/**
 * Get a downloadable URL for a file in Appwrite storage.
 * @param fileId - The unique ID of the file in the bucket
 * @returns The file download URL
 */
export const getFileDownloadUrl = (fileId: string) => {
    if (!process.env.NEXT_PUBLIC_BUCKET_ID) {
        throw new Error("❌ BUCKET_ID is not defined in environment variables.");
    }

    try {
        const result = storage.getFileDownload(process.env.NEXT_PUBLIC_BUCKET_ID!, fileId);
        return result; // This returns a `URL` Promise (you can await it where used)
    } catch (err) {
        console.error("Failed to get file download URL:", err);
        throw err;
    }
};
