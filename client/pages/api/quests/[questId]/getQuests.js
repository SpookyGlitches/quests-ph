import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

export default async function getSpecificQuestHandler(req, res) {
  const prisma = new PrismaClient();
  if (req.method !== "GET") {
    return res.status(400).send();
  }
  try {
    const { user } = await getSession({ req });

    const quest = await prisma.quest.findUnique({
      where: {
        questId: Number(req.query.questId),
      },
    });
    return res.status(200).json(quest);
  } catch (error) {
    console.log(error);
    return res.status(401).send();
  }
}
