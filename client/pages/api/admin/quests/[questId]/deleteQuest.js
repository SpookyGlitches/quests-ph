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

    const postIdArr = [];
    const postIds = [];
    for (let i = 0; i < findPartyMembers.length; i++) {
      // eslint-disable-next-line
      const getPostId = await prisma.post.findMany({
        where: {
          partyMemberId: findPartyMembers[i].partyMemberId,
        },
      });
      postIdArr.push(getPostId);
    }
    postIdArr.forEach((item) => {
      // eslint-disable-next-line
      for (const key in item) {
        postIds.push(item[key].postId);
      }
    });

    // delete post files
    const transactions = [];
    for (let i = 0; i < postIds.length; i++) {
      transactions.push(
        prisma.postFile.updateMany({
          where: {
            postId: postIds[i],
          },
          data: {
            deletedAt: new Date(),
          },
        }),
      );
    }

    for (let x = 0; x < findPartyMembers.length; x++) {
      transactions.push(
        prisma.post.updateMany({
          where: {
            partyMemberId: Number(findPartyMembers[x].partyMemberId),
          },
          data: {
            updatedAt: new Date(),
            deletedAt: new Date(),
          },
        }),
      );
      transactions.push(
        prisma.comment.updateMany({
          where: {
            partyMemberId: Number(findPartyMembers[x].partyMemberId),
          },
          data: {
            deletedAt: new Date(),
          },
        }),
      );
      transactions.push(
        prisma.commentReact.updateMany({
          where: {
            partyMemberId: Number(findPartyMembers[x].partyMemberId),
          },
          data: {
            deletedAt: new Date(),
          },
        }),
      );
      transactions.push(
        prisma.pointsLog.updateMany({
          where: {
            partyMemberId: Number(findPartyMembers[x].partyMemberId),
          },
          data: {
            deletedAt: new Date(),
          },
        }),
      );
      transactions.push(
        prisma.postReact.updateMany({
          where: {
            partyMemberId: Number(findPartyMembers[x].partyMemberId),
          },
          data: {
            updatedAt: new Date(),
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
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    });
    transactions.push(deleteQuestTask);

    // delete quest task finished
    const deleteQuestTaskFinisher = prisma.questTaskFinisher.updateMany({
      where: {
        questId: Number(req.query.questId),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    transactions.push(deleteQuestTaskFinisher);

    // delete quest pt bans
    const deletequestPtBans = prisma.questPartyBan.updateMany({
      where: {
        questId: Number(req.query.questId),
      },
      data: {
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    });
    transactions.push(deletequestPtBans);
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
