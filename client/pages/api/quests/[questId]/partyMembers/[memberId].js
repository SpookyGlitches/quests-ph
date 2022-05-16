import axios from "axios";
import prisma from "../../../../../lib/prisma";
import withQuestProtect from "../../../../../middlewares/withQuestProtect";

async function editWoopStatement(req, res) {
  try {
    const { outcome, obstacle, plan } = req.body;
    const partyMemberWoop = await prisma.partyMember.update({
      where: {
        partyMemberId: Number(req.query.memberId),
      },
      data: {
        outcome,
        obstacle,
        plan,
      },
    });
    return res.status(200).json(partyMemberWoop);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

async function removePartyMember(req, res) {
  try {
    const partyMemberData = await prisma.partyMember.findFirst({
      where: {
        partyMemberId: Number(req.query.memberId),
      },
      rejectOnNotFound: true,
      select: {
        questId: true,
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
      if (talkJsRes.data.data[i].id === `${partyMemberData.questId}QuestChat`) {
        flag = 1;
      }
    }

    /* If the flag is up, meaning the user is part of the quest's chat, he is removed
    from participating. */
    if (flag === 1) {
      await axios.delete(
        `https://api.talkjs.com/v1/tvcbUw3n/conversations/${partyMemberData.questId}QuestChat/participants/${partyMemberData.userId}`,
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

    const removeMemberOperation = prisma.partyMember.update({
      where: {
        partyMemberId: partyMemberData.partyMemberId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    await prisma.$transaction([
      removePostFilesOperation,
      removePostsOperation,
      removeMemberOperation,
    ]);
    return res.status(200).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    // todo: check if the current user is really the one who owns the resource
    case "PUT":
      return withQuestProtect(editWoopStatement, req, res, [
        "MENTEE",
        "PARTY_LEADER",
      ]);
    case "DELETE":
      return withQuestProtect(removePartyMember, req, res, [
        "MENTOR",
        "MENTEE",
        "PARTY_LEADER",
      ]);
    default:
      return res.status(404).send();
  }
}
