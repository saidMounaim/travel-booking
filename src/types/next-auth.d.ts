import "next-auth";

declare module "next-auth" {
  interface User {
    isAdmin: boolean;
  }
  interface Session {
    user?: {
      id: number;
    } & DefaultSession["user"];
  }
}
