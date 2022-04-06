// import { prisma } from "../../../lib/prisma";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getAllUser(req, res) {
  if (req.method === "GET") {
    const { searchVal } = req.body;

    const fullname = "RJ Fajardo";

    const firstString = fullname.split(" ");

    const firstName = firstString[0];

    const secondName = firstString[1];

    const users = await prisma.user.findMany({
      where: {
        fullName: firstName || secondName || fullname,

        //lvalue  = RJ Fajardo
      },
    });

    return res.status(200).json(users);
  }
}
