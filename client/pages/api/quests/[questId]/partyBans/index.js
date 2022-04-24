import prisma from "../../../../../lib/prisma";
import withQuestProtect from "../../../../../middlewares/withQuestProtect";

async function getQuestPartyBans(req, res) {
  try {
    const { questId } = req.query;
    const partyBans = await prisma.questPartyBan.findMany({
      where: {
        questId: Number(questId),
      },
      include: {
        user: {
          select: {
            displayName: true,
            image: true,
          },
        },
      },
    });
    return res.status(200).json(partyBans);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

async function banPartyMember(req, res) {
  try {
    const { questId } = req.query;
    const { userId } = req.body;
    const parsedQuestId = Number(questId) || -1;

    const existingBan = await prisma.questPartyBan.findFirst({
      where: {
        questId: parsedQuestId,
        userId,
      },
    });
    if (existingBan) return res.status(200).send(existingBan);

    // START REMOVING USER CONTENT

    const partyMemberData = await prisma.partyMember.findFirst({
      where: {
        questId: parsedQuestId,
        userId,
      },
      rejectOnNotFound: true,
      select: {
        userId: true,
        partyMemberId: true,
        posts: {
          select: {
            postId: true,
            postFiles: {
              select: {
                postFileId: true,
              },
            },
          },
        },
      },
    });

    const postIds = [];
    const postFileIds = [];

    partyMemberData.posts.forEach((post) => {
      postIds.push(post.postId);
      post.postFiles.forEach((file) => postFileIds.push(file.postFileId));
    });

    const removePostFilesOperation = prisma.postFile.updateMany({
      where: {
        postFileId: {
          in: postFileIds,
        },
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    const removePostsOperation = prisma.post.updateMany({
      where: {
        postId: {
          in: postIds,
        },
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    // END USER CONTENT REMOVAL

    const removeMemberOperation = prisma.partyMember.delete({
      where: {
        partyMemberId: partyMemberData.partyMemberId,
      },
    });
    const banMemberOperation = prisma.questPartyBan.create({
      data: {
        questId: parsedQuestId,
        userId,
      },
    });
    await prisma.$transaction([
      removePostFilesOperation,
      removePostsOperation,
      removeMemberOperation,
      banMemberOperation,
    ]);

    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return withQuestProtect(getQuestPartyBans, req, res, ["PARTY_LEADER"]);
    case "POST":
      return withQuestProtect(banPartyMember, req, res, ["PARTY_LEADER"]);
    default:
      return res.status(405).send();
  }
}
