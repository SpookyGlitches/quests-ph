import prisma from "../../../../../lib/prisma";

export default async function getFriendQuestChart(req, res) {
  const questsVal = [];
  const ptVal = [];
  const questList = [];
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  if (req.method === "GET") {
    try {
      // find quests wherein friend is a party leader and are completed
      const getQuests = await prisma.quest.findMany({
        where: {
          userId: req.query.userId,
          deletedAt: null,
          NOT: {
            completedAt: null,
          },
        },
      });
      if (getQuests) {
        // store the questId of completed and party leader-ed quests of friend in questsVal
        for (let x = 0; x < getQuests.length; x++) {
          questsVal[x] = getQuests[x].questId;
        }
        // find quests wherein friend is a party member of
        const getPtMember = await prisma.partyMember.findMany({
          where: {
            userId: req.query.userId,
          },
        });
        // store questIds of quests friend is a party member off
        if (getPtMember) {
          for (let x = 0; x < getPtMember.length; x++) {
            ptVal[x] = getPtMember[x].questId;
          }
          // add questsIds to questsVal to combine both party leader-ed and party member-ed quests
          const size = questsVal.length + ptVal.length;
          for (let x = questsVal.length, y = 0; x < size; x++, y++) {
            questsVal[x] = ptVal[y];
          }
        }
        // remove the duplicates because once data is inserted in the quests table, it will also be inserted to the party
        // member table
        const uniqueQuestsId = questsVal.filter(onlyUnique);

        // with the array of questsIds, (both party member and party leader-ed quests),
        // query the quest table x times depending on the size of the array of questsIds
        // wherein completedAt is not null
        for (let x = 0; x < uniqueQuestsId.length; x++) {
          // eslint-disable-next-line
          const getFinalQuests = await prisma.quest.findMany({
            where: {
              questId: uniqueQuestsId[x],
              deletedAt: null,
              NOT: {
                completedAt: null,
              },
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
