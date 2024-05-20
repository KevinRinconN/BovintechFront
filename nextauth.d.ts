import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      firstname: string;
      lastname: string;
      email: string;
      rol: string;
      access_token: string;
      image?: string;
    } & DefaultSession["user"];
  }
}
