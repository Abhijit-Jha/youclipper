// types/next-auth.d.ts or ./next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: JWT,
    user: {
      id: JWT;
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
    isPremium: boolean;
    isFreeTrialUsed: boolean;
  }
}
