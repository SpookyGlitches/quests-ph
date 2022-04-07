import prisma from "../../../../../../../lib/prisma";
import withQuestProtect from "../../../../../../../middlewares/withQuestProtect";

async function addComment(req, res) {
  try {
    const { content, partyMember } = req.body;
    const { postId } = req.query;
    const comment = await prisma.comment.create({
      data: {
        content,
        postId: Number(postId),
        partyMemberId: partyMember.partyMemberId,
      },
    });

    return res.json(comment);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

async function getComments(req, res) {
  try {
    const { postId } = req.query;
    const comments = await prisma.comment.findMany({
      where: {
        postId: Number(postId),
        partyMember: {
          deletedAt: null,
          user: {
            deletedAt: null,
          },
        },
        commentReacts: {
          every: {
            deletedAt: null,
          },
        },
      },
      select: {
        content: true,
        commentId: true,
        createdAt: true,
        partyMemberId: true,
        partyMember: {
          select: {
            user: {
              select: {
                userId: true,
                displayName: true,
                image: true,
              },
            },
          },
        },
        commentReacts: {
          select: {
            type: true,
            commentReactId: true,
            partyMember: {
              select: {
                user: {
                  select: {
                    userId: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    console.log(comments);
    return res.json(comments);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return withQuestProtect(getComments, req, res, [
        "PARTY_LEADER",
        "MENTOR",
        "MENTEE",
      ]);
    case "POST":
      return withQuestProtect(addComment, req, res, [
        "PARTY_LEADER",
        "MENTOR",
        "MENTEE",
      ]);
    default:
      return res.status(405).send();
  }
}
