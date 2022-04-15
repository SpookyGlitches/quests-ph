import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function getUserQuestList(req, res) {
  if (req.method === "GET") {
    try {
      const param = req.query.categoryNum;
      const { user } = await getSession({ req });
      // eslint-disable-next-line
      if (param == 0) {
        // active = completed at is null
        const getQuests = await prisma.quest.findMany({
          where: {
            userId: user.userId,
            completedAt: null,
            deletedAt: null,
          },
        });
        return res.status(200).json(getQuests);
      }
      // inactive = completedat is not null
      const getQuests = await prisma.quest.findMany({
        where: {
          userId: user.userId,
          deletedAt: null,
          NOT: {
            completedAt: null,
          },
        },
      });
      return res.status(200).json(getQuests);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Something went wrong" });
    }
  } else {
    return res.status(404).json({ message: "Method not allowed " });
  }
}
