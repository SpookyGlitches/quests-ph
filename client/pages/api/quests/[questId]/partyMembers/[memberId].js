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
