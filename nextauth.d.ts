import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      rol: "ADMIN" | "OPERATOR";
      access_token: string;
      image?: string;
    } & DefaultSession["user"];
  }
}
