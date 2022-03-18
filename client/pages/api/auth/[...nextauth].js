import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
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
        const findUser = await prisma.user.findFirst({
          where: {
            email: credentials.email,
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
              },
            });
            if (user) {
              userAccount = user;
              return user;
            }
          }
        }
        // const user = await prisma.user.findFirst({
        //   where: {
        //     email: credentials.email,
        //     password: credentials.password,
        //   },
        // });

        // if (user) {
        //   userAccount = user;
        //   return user;
        // }
        return null;
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line
    signIn(user, account, profile) {
      if (typeof user.user.id !== typeof undefined) {
        if (user.user.isActive === "1") {
          return user;
        }
        return false;
      }
      return false;
    },
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        // token.id = user.id;
        // eslint-disable-next-line
        token.user = user;
      }

      return token;
    },
    // eslint-disable-next-line
    session: ({ session }) => {
      if (userAccount !== null) {
        // eslint-disable-next-line
        session.user = userAccount;
      }
      return session;
    },
  },
});
