import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getPost(req, res) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        postId: Number(req.query.postId),
      },
      include: {
        user: {
          select: {
            displayName: true,
          },
        },
        _count: {
          select: {
            postFiles: true,
          },
        },
        postFiles: {
          select: {
            postFileId: true,
            path: true,
          },
        },
      },
    });
    return res.status(200).send(post);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getPost(req, res);
    default:
      return res.status(405).send();
  }
}
