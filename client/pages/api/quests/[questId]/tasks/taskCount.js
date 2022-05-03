import prisma from "../../../../../lib/prisma";

export default async function getTaskCount(req, res) {
  if (req.method !== "GET") {
    return res.status(400).send();
  }

  const count = await prisma.questTask.count({
    where: {
      questId: Number(req.query.questId),
    },
  });

  await prisma.$disconnect();
  return res.status(200).send(count);
}
