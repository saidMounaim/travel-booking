import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { Adapter } from "next-auth/adapters";

export const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      if (user?.name) token.name = user?.name;
      if (user?.isAdmin) token.isAdmin = user?.isAdmin;
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      if (token?.id) session.user.id = token.id;
      if (token?.name) session.user.name = token.name;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },

  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      //@ts-ignore
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await prisma.user.findFirst({
          where: { email },
        });
        if (user && bcrypt.compareSync(password, user.password)) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          };
        }
        throw new Error("Invalid Email or Password");
      },
    }),
  ],
} satisfies NextAuthOptions;
