import prisma from "../../../../lib/prisma";

export default async function getVisitedUserProfileName(req, res) {
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
