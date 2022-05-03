import prisma from "../../../../lib/prisma";

export default async function getSpecificQuestHandler(req, res) {
  if (req.method !== "GET") {
    return res.status(400).send();
  }
  try {
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
