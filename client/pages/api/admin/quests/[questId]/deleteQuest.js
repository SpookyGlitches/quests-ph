import prisma from "../../../../../lib/prisma";

export default async function deleteQuests(req, res) {
  if (req.method !== "PUT") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    // find pt members
    const findPartyMembers = await prisma.partyMember.findMany({
      where: {
        questId: Number(req.query.questId),
      },
    });

    const transactions = [];
    for (let x = 0; x < findPartyMembers.length; x++) {
      transactions.push(
        prisma.post.updateMany({
          where: {
            partyMemberId: Number(findPartyMembers[x].partyMemberId),
          },
          data: {
            deletedAt: new Date(),
          },
        }),
      );
    }
    // Delete party member
    const deleteParty = prisma.partyMember.updateMany({
      where: {
        questId: Number(req.query.questId),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    transactions.push(deleteParty);
    // Delete quests
    const deleteQuest = prisma.quest.update({
      where: {
        questId: Number(req.query.questId),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    transactions.push(deleteQuest);
    // Delete quest task
    const deleteQuestTask = prisma.questTask.updateMany({
      where: {
        questId: Number(req.query.questId),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    transactions.push(deleteQuestTask);
    // Delete quest mentorship
    const deleteMentorReq = prisma.questMentorshipRequest.updateMany({
      where: {
        questId: Number(req.query.questId),
      },
      data: {
        status: "INACTIVE",
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    });
    transactions.push(deleteMentorReq);

    await prisma.$transaction(transactions);
    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
