import prisma from "../../../../../lib/prisma";

export default async function getFriendQuestChart(req, res) {
  const retVal = [];
  if (req.method === "GET") {
    try {
      const getSocial = await prisma.quest.count({
        where: {
          userId: req.query.userId,
          category: "SOCIAL",
        },
      });
      const getCareer = await prisma.quest.count({
        where: {
          userId: req.query.userId,
          category: "CAREER",
        },
      });
      const getHealth = await prisma.quest.count({
        where: {
          userId: req.query.userId,
          category: "HEALTH",
        },
      });
      retVal.push(getHealth);
      retVal.push(getSocial);
      retVal.push(getCareer);
      return res.status(200).json(retVal);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Something went wrong" });
    }
  } else {
    return res.status(404).json({ message: "Method not allowed " });
  }
}
