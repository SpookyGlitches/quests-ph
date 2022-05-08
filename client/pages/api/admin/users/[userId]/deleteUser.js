import prisma from "../../../../../lib/prisma";

export default async function deleteUsers(req, res) {
  if (req.method !== "PUT") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const findPartyMemberId = await prisma.partyMember.findMany({
      where: {
        userId: req.query.userId,
      },
    });

    const postIdArr = [];
    const postIds = [];
    for (let i = 0; i < findPartyMemberId.length; i++) {
      // eslint-disable-next-line
      const getPostId = await prisma.post.findMany({
        where: {
          partyMemberId: findPartyMemberId[i].partyMemberId,
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
    for (let x = 0; x < findPartyMemberId.length; x++) {
      transactions.push(
        prisma.comment.updateMany({
          where: {
            partyMemberId: Number(findPartyMemberId[x].partyMemberId),
          },
          data: {
            updatedAt: new Date(),
            deletedAt: new Date(),
          },
        }),
      );
      transactions.push(
        prisma.commentReact.updateMany({
          where: {
            partyMemberId: Number(findPartyMemberId[x].partyMemberId),
          },
          data: {
            deletedAt: new Date(),
          },
        }),
      );
      transactions.push(
        prisma.pointsLog.updateMany({
          where: {
            partyMemberId: Number(findPartyMemberId[x].partyMemberId),
          },
          data: {
            deletedAt: new Date(),
          },
        }),
      );
      transactions.push(
        prisma.post.updateMany({
          where: {
            partyMemberId: Number(findPartyMemberId[x].partyMemberId),
          },
          data: {
            updatedAt: new Date(),
            deletedAt: new Date(),
          },
        }),
      );
      transactions.push(
        prisma.postReact.updateMany({
          where: {
            partyMemberId: Number(findPartyMemberId[x].partyMemberId),
          },
          data: {
            updatedAt: new Date(),
            deletedAt: new Date(),
          },
        }),
      );
    }

    // Delete usercurrency
    const deleteUserCurrency = prisma.userCurrency.update({
      where: {
        userId: req.query.userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    transactions.push(deleteUserCurrency);

    // Delete articles
    const deleteArticles = prisma.article.updateMany({
      where: {
        userId: req.query.userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    transactions.push(deleteArticles);

    // Delete friend requests
    const deleteFriendReq = prisma.friendRequest.updateMany({
      where: {
        OR: [
          {
            requesterId: req.query.userId,
          },
          {
            requesteeId: req.query.userId,
          },
        ],
      },
      data: {
        deletedAt: new Date(),
      },
    });
    transactions.push(deleteFriendReq);

    // Delete user from friends
    const deleteFriend = prisma.friendship.updateMany({
      where: {
        OR: [
          {
            userOneId: req.query.userId,
          },
          {
            userTwoId: req.query.userId,
          },
        ],
      },
      data: {
        deletedAt: new Date(),
      },
    });

    transactions.push(deleteFriend);

    // Delete notifications
    const deleteNot = prisma.notification.updateMany({
      where: {
        userId: req.query.userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    transactions.push(deleteNot);

    // Delete user as party member
    const deletePartyMember = prisma.partyMember.updateMany({
      where: {
        userId: req.query.userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    transactions.push(deletePartyMember);

    // Delete quests
    const deleteQuest = prisma.quest.updateMany({
      where: {
        userId: req.query.userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    transactions.push(deleteQuest);

    // Delete quest mentorship
    const deleteMentorReq = prisma.questMentorshipRequest.updateMany({
      where: {
        OR: [
          {
            partyLeaderId: req.query.userId,
          },
          {
            mentorId: req.query.userId,
          },
        ],
      },
      data: {
        status: "INACTIVE",
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    });
    transactions.push(deleteMentorReq);

    // Delete quest task
    const deleteQuestTask = prisma.questTask.updateMany({
      where: {
        userId: req.query.userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    transactions.push(deleteQuestTask);

    const deleteQuestTaskFinisher = prisma.questTaskFinisher.updateMany({
      where: {
        userId: req.query.userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    transactions.push(deleteQuestTaskFinisher);

    const deleteQuestPartyBan = prisma.questPartyBan.updateMany({
      where: {
        userId: req.query.userId,
      },
      data: {
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    });
    transactions.push(deleteQuestPartyBan);

    // Delete user badges
    const deleteUserBadge = prisma.userBadge.updateMany({
      where: {
        userId: req.query.userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    transactions.push(deleteUserBadge);

    // delete verification token
    const deleteUserToken = prisma.verificationToken.updateMany({
      where: {
        userId: req.query.userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    transactions.push(deleteUserToken);

    // Delete mentorship application
    const deleteMentorApplication = prisma.mentorApplication.updateMany({
      where: {
        mentorId: req.query.userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    transactions.push(deleteMentorApplication);

    // Delete mentor file
    const deleteMentorfile = prisma.mentorFile.updateMany({
      where: {
        mentorUploadId: req.query.userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    transactions.push(deleteMentorfile);
    // delete user
    const deleteUser = prisma.user.update({
      where: {
        userId: req.query.userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    transactions.push(deleteUser);

    await prisma.$transaction(transactions);
    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
