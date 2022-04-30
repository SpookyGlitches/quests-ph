import { PrismaClient } from "@prisma/client";

export default async function getVisitedUserProfileName(req, res) {
  const prisma = new PrismaClient();
  if (req.method !== "GET") {
    return res.status(400).send();
  }
  const pName = await prisma.user.findUnique({
    where: {
      userId: req.query.userId,
    },
    select: {
      displayName: true,
    },
  });

  await prisma.$disconnect();
  return res.status(200).json(pName);
}
