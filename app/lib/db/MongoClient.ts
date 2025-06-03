import { MongoClient } from "mongodb";

// MongoDB connection URI from .env
const uri = process.env.MONGO_DB_URI!;
const options = {}; // You can customize this if needed

// Global type extension (Node.js doesn't have _mongoClientPromise by default)
declare global {
  // Ensures this works in both serverless and dev environments
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Allow this file to be used as a module
export {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) throw new Error("Missing MONGO_DB_URI");

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
