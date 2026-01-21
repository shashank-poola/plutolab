import type { Account, AuthOptions, ISODateString } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import type { JWT } from "next-auth/jwt";
import axios from "axios";
import { SIGNIN_URL } from "@/routes/apiRoutes";

export interface UserType {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  token?: string | null;
}

export interface CustomSession {
  user?: UserType;
  expires: ISODateString;
}

export const authOption: AuthOptions = {
  pages: {
    signIn: "/",
  },

  callbacks: {
    async signIn({ user, account }: { user: UserType; account: Account | null }) {
      try {
        if (!account) return false;

        const response = await axios.post(SIGNIN_URL, {
          user,
          account: {
            provider: account.provider,
          },
        });

        const result = response.data;

        if (result?.success) {
          user.id = result.user.id;
          user.token = result.token;
          return true;
        }

        return false;
      } catch (err) {
        console.error("Signin callback error:", err);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) token.user = user as UserType;
      return token;
    },

    async session({ session, token }: { session: CustomSession; token: JWT }) {
      session.user = token.user as UserType;
      return session;
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_SECRET_ID || "",
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_SECRET_ID || "",
    }),
  ],
};