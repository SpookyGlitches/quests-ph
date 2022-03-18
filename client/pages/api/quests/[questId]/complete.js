import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    await prisma.quest.update({
      where: {
        id: Number(req.query.questId),
      },
      data: {
        completedAt: new Date(),
      },
    });
    res.status(200).send();
  } else {
    res.status(404).send();
  }
}