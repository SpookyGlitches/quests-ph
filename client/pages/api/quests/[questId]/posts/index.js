import { getSession } from "next-auth/react";
import postValidations from "../../../../../validations/post";

import prisma from "../../../../../lib/prisma";

async function getPosts(req, res) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        questId: Number(req.query.questId),
      },
      include: {
        user: {
          select: {
            displayName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).send(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}

async function createPost(req, res) {
  try {
    const { title, body, files } = req.body;
    const { user } = await getSession({ req });
    await postValidations.validate({ title, body });
    const post = await prisma.post.create({
      data: {
        title,
        body,
        userId: user.userId,
        questId: Number(req.query.questId),
        postFiles: {
          connect: files,
        },
      },
    });

    return res.status(200).json(post);
  } catch (err) {
    console.error(err);
    return res.status(400).send();
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getPosts(req, res);
    case "POST":
      return createPost(req, res);
    default:
      return res.status(405).send();
  }
}
