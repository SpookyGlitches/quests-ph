import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prisma";

let userAccount = null;
export default NextAuth({
  adapter: PrismaAdapter(prisma),
  cookie: {
    secure: process.env.NODE_ENV && process.env.NODE_ENV === "production",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      // eslint-disable-next-line
      async authorize(credentials, req) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
            password: credentials.password,
          },
        });

        if (user) {
          userAccount = user;
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line
    async signIn(user, account, profile) {
      if (typeof user.user.id !== typeof undefined) {
        if (user.user.isActive === "1") {
          console.log("here");
          return user;
        }
        return false;
      }
      return false;
    },

    async session(session, token) {
      if (userAccount !== null) {
        // eslint-disable-next-line
        session.user = userAccount;
      } else if (
        typeof token.user !== typeof undefined &&
        (typeof session.user === typeof undefined ||
          (typeof session.user !== typeof undefined &&
            typeof session.user.userId === typeof undefined))
        // eslint-disable-next-line
      ) {
        // eslint-disable-next-line
        session.user = token.user;
        // eslint-disable-next-line
      } else if (typeof token !== typeof undefined) {
        // eslint-disable-next-line
        session.token = token;
      }
      return session;
    },
    // eslint-disable-next-line
    async jwt(token, user, account, profile, isNewUser) {
      if (typeof user !== typeof undefined) {
        // eslint-disable-next-line
        token.user = user;
      }

      return token;
    },
  },
});
