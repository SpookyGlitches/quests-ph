import axios from "axios";
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

    // Removes the user from the group chat
    const talkJsRes = await axios.get(
      `https://api.talkjs.com/v1/tvcbUw3n/users/${partyMemberData.userId}/conversations`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${process.env.TALKJS_KEY}`,
        },
      },
    );

    /* Flag variable to tell us if we found the convo in the list of the user's
      list of convos and stop the loop */
    let flag = 0;
    for (let i = 0; i < talkJsRes.data.data.length && flag === 0; i++) {
      if (talkJsRes.data.data[i].id === `${questId}QuestChat`) {
        flag = 1;
      }
    }

    /* If the flag is up, meaning the user is part of the quest's chat, he is removed
    from participating. */
    if (flag === 1) {
      await axios.delete(
        `https://api.talkjs.com/v1/tvcbUw3n/conversations/${questId}QuestChat/participants/${partyMemberData.userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${process.env.TALKJS_KEY}`,
          },
        },
      );
    }

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
    const insertNotifBan = prisma.Notification.create({
      data: {
        userId,
        message: "You have been ban by the Party Leader",
        type: "USER_BAN",
        metadata: JSON.stringify({ questId: parsedQuestId }),
      },
    });
    await prisma.$transaction([
      removePostFilesOperation,
      removePostsOperation,
      removeMemberOperation,
      banMemberOperation,
      insertNotifBan,
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
