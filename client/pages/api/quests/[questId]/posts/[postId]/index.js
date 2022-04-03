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
      },
    });
    return res.status(200).send(post);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

async function editPost(req, res) {
  try {
    const { title, body, files } = req.body;
    const post = await prisma.post.update({
      where: {
        postId: Number(req.query.postId),
      },
      data: {
        title,
        body,
        postFiles: {
          connect: files,
        },
      },
    });
    return res.status(200).send(post);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

async function deletePost(req, res) {
  try {
    // https://github.com/prisma/prisma/issues/3398
    const { postId } = req.query;
    const post = prisma.post.delete({
      where: {
        postId: Number(postId),
      },
    });
    const fileDelete = prisma.postFile.deleteMany({
      where: {
        postId: Number(postId),
      },
    });
    await prisma.$transaction([post, fileDelete]);
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
}
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getPost(req, res);
    case "PUT":
      return editPost(req, res);
    case "DELETE":
      return deletePost(req, res);
    default:
      return res.status(405).send();
  }
}
