import prisma from "../../../../../../../../lib/prisma";
import withQuestProtect from "../../../../../../../../middlewares/withQuestProtect";

async function deleteComment(req, res) {
  try {
    const { commentId } = req.query;
    const comment = await prisma.comment.delete({
      where: {
        commentId: Number(commentId),
      },
    });

    return res.json(comment);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

async function updateComment(req, res) {
  try {
    const { commentId } = req.query;
    const comment = await prisma.comment.update({
      where: {
        commentId: Number(commentId),
      },
      data: {
        content: req.body.content,
      },
    });
    return res.json(comment);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "DELETE":
      return withQuestProtect(deleteComment, req, res, [
        "PARTY_LEADER",
        "MENTOR",
        "MENTEE",
      ]);
    case "PUT":
      return withQuestProtect(updateComment, req, res, [
        "PARTY_LEADER",
        "MENTOR",
        "MENTEE",
      ]);

    default:
      return res.status(405).send();
  }
}
