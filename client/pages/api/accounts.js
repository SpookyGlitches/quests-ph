// import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// eslint-disable-next-line
export default async function (req, res) {
  try {
    if (req.method === "POST") {
      const data = req.body;
      console.log(data);
      const userDetails = JSON.parse(req.body);
      // eslint-disable-next-line
      const userInfo = await prisma.user.create({ data: userDetails });
      await prisma.$disconnect();
      res.json([]);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
    await prisma.$disconnect();
  }
}
