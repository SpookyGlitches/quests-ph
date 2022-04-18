import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "../../../lib/prisma";

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
        const findUser = await prisma.user.findFirst({
          where: {
            email: credentials.email,
            deletedAt: null,
          },
        });

        if (findUser) {
          const checkPass = await bcrypt.compare(
            credentials.password,
            findUser.password,
          );
          if (checkPass) {
            const user = await prisma.user.findFirst({
              where: {
                email: credentials.email,
                deletedAt: null,
              },
            });
            if (user) {
              return user;
            }
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line
    signIn(user, account, profile) {
      if (typeof user.user.userId !== typeof undefined) {
        if (user.user.verificationStatus === false) {
          console.log("not verified");
        } else {
          return user;
        }
      }
      return false;
    },
    jwt: ({ token, user }) => {
      // user is only available after signing in. The rest is handled by token.

      if (user) {
        // eslint-disable-next-line
        token.user = user; // assign user object to token bc this will be used in succeeding sessions.
      }
      // eslint-disable-next-line
      return token;
    },

    // eslint-disable-next-line
    session: ({ session, token, user }) => {
      if (token) {
        // eslint-disable-next-line
        session.user = token.user;
      }
      // eslint-disable-next-line
      return session;
    },
  },
});
