import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function GetMyQuestsListActive(req, res) {
  const questsVal = [];
  const ptVal = [];
  const questList = [];
  const { user } = await getSession({ req });
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  if (req.method === "GET") {
    try {
      const getQuests = await prisma.quest.findMany({
        where: {
          userId: user.userId,
          completedAt: null,
          deletedAt: null,
        },
      });

      if (getQuests) {
        for (let x = 0; x < getQuests.length; x++) {
          questsVal[x] = getQuests[x].questId;
        }
        const getPtMember = await prisma.partyMember.findMany({
          where: {
            userId: user.userId,
            deletedAt: null, // user hasn't left the party
          },
        });
        if (getPtMember) {
          for (let x = 0; x < getPtMember.length; x++) {
            ptVal[x] = getPtMember[x].questId;
          }
          const size = questsVal.length + ptVal.length;
          for (let x = questsVal.length, y = 0; x < size; x++, y++) {
            questsVal[x] = ptVal[y];
          }
        }
        const uniqueQuestsId = questsVal.filter(onlyUnique);
        for (let x = 0; x < uniqueQuestsId.length; x++) {
          // eslint-disable-next-line
          const getFinalQuests = await prisma.quest.findMany({
            where: {
              questId: uniqueQuestsId[x],
              completedAt: null,
              deletedAt: null,
            },
          });
          questList.push(getFinalQuests);
        }
      }
      return res.status(200).json(questList);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Something went wrong" });
    }
  } else {
    return res.status(404).json({ message: "Method not allowed " });
  }
}
