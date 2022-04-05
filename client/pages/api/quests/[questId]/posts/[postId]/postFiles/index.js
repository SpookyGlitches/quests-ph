import prisma from "../../../../../../../lib/prisma";
import withQuestProtect from "../../../../../../../middlewares/withQuestProtect";

async function getPostFiles(req, res) {
  try {
    const postFiles = await prisma.postFile.findMany({
      where: {
        postId: Number(req.query.postId),
      },
      select: {
        name: true,
        key: true,
        mimeType: true,
        postFileId: true,
        postId: true,
        createdAt: true,
        post: {
          select: {
            partyMember: {
              select: {
                partyMemberId: true,
              },
            },
          },
        },
      },
    });
    return res.status(200).send(postFiles);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

async function addPostFile(req, res) {
  try {
    const { mimeType, name, key } = req.body;
    const postFile = await prisma.postFile.create({
      data: {
        postId: Number(req.query.postId) || null,
        mimeType,
        name,
        key,
      },
    });
    return res.json(postFile);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
async function deletePostFiles(req, res) {
  try {
    const postFiles = await prisma.postFile.deleteMany({
      where: {
        key: {
          in: req.body.filesToDelete,
        },
      },
    });
    return res.json(postFiles);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return withQuestProtect(getPostFiles, req, res, [
        "PARTY_LEADER",
        "MENTOR",
        "MENTEE",
      ]);
    case "POST":
      return addPostFile(req, res);
    case "DELETE":
      return deletePostFiles(req, res);
    default:
      return res.status(405).send();
  }
}
