// import { prisma } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();
export default async function handler(req, res) {
  const { user } = await getSession({ req });
  if (req.method === "GET") {
    const users = await prisma.user.findMany({
      //this is to not include the current user
      where: {
        NOT: {
          userId: user.userId,
        },
      },
      // select: {
      //   password: false,
      // },
    });
    res.status(200).json(users);
  }
}
