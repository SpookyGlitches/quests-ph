import { getSession } from "next-auth/react";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default async function getTaskCount(req, res) {
  if (req.method !== "GET") {
    return res.status(400).send();
  }

  const { user } = await getSession({ req });

  const count = await prisma.questTask.count({
    where: {
      questId: Number(req.query.questId),
    },
  });

  return res.status(200).send(count);
}
