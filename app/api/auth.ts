import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dotenv from "dotenv";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../lib/db/MongoClient";
import User from "../lib/db/Schema";
import { connectToDB } from "../lib/db/connectToDb";
import jwt from "jsonwebtoken";

dotenv.config();

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      await connectToDB();
      const userData = await User.findOne({ email: user.email });
      if (!userData) {
        await User.create({
          ...user,
          isPremium: false,
          isFreeTrialUsed: true,
        });
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        await connectToDB();
        const dbUser = await User.findOne({ email: user.email });
        const customToken = jwt.sign(
          {
            id: (dbUser?._id as string).toString(),
            name: dbUser?.name,
            email: dbUser?.email,
            isPremium: dbUser?.isPremium,
            isFreeTrailUsed: dbUser?.isFreeTrialUsed,
          },
          process.env.NEXTAUTH_SECRET!,
          { expiresIn: "24h" }
        );

        token.accessToken = customToken;
        token.id = (dbUser?._id as string).toString();
        token.isPremium = dbUser?.isPremium ?? false;
        token.isFreeTrialUsed = dbUser?.isFreeTrialUsed ?? true;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.accessToken = token.accessToken;
        session.user.isPremium = token?.isPremium ?? false;
        session.user.isFreeTrialUsed = token?.isFreeTrialUsed ?? false;
      }
      return session;
    },
  },
};

export const handlers = NextAuth(authOptions);
