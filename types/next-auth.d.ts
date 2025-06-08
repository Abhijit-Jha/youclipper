// types/next-auth.d.ts or ./next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string,
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isPremium: boolean;
      isFreeTrialUsed: boolean;
    };
  }

  interface User {
    isPremium: boolean;
    isFreeTrialUsed: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id : string,
    accessToken : string,
    isPremium: boolean;
    isFreeTrialUsed: boolean;
  }
}
