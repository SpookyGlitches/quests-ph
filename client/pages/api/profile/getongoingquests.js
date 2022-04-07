import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function GetQuestPartyLeader(req, res) {
  if (req.method === "GET") {
    try {
      const { user } = await getSession({ req });
      // find available parties of party leader
      const getAvailQuests = await prisma.quest.findMany({
        where: {
          userId: user.userId,
          completedAt: null,
          deletedAt: null,
        },
      });

      return res.status(200).json(getAvailQuests);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Something went wrong" });
    }
  } else {
    return res.status(404).json({ message: "Method not allowed " });
  }
}
