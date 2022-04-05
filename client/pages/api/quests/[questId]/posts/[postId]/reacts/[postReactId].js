import prisma from "../../../../../../../lib/prisma";
import withQuestProtect from "../../../../../../../middlewares/withQuestProtect";

async function editReact(req, res) {
  try {
    const { type } = req.body;
    const postReact = await prisma.postReact.update({
      data: {
        type,
      },
      where: {
        postReactId: Number(req.query.postReactId),
      },
    });
    return res.json(postReact);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

async function deleteReact(req, res) {
  try {
    const postReact = await prisma.postReact.delete({
      where: {
        postReactId: Number(req.query.postReactId),
      },
    });
    return res.json(postReact);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
export default async function handler(req, res) {
  switch (req.method) {
    // todo, ea: check if the current user is allowed to do modify the resource
    case "PUT":
      return withQuestProtect(editReact, req, res, [
        "PARTY_LEADER",
        "MENTOR",
        "MENTEE",
      ]);
    case "DELETE":
      return withQuestProtect(deleteReact, req, res, [
        "PARTY_LEADER",
        "MENTOR",
        "MENTEE",
      ]);
    default:
      return res.status(405).send();
  }
}
