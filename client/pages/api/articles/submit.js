import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

async function submitArticles(req, res) {
  const { user } = await getSession({ req });
  try {
    const createArticles = await prisma.article.create({
      data: {
        userId: user.userId,
        category: req.query.category,
        link: req.query.link,
      },
    });
    return res.status(200).send(createArticles);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
}

async function getArticles(req, res) {
  const { user } = await getSession({ req });
  try {
    const findArticles = await prisma.article.findMany({
      where: {
        userId: user.userId,
        link: req.query.link,
        approvedAt: null,
      },
    });
    return res.status(200).json(findArticles);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getArticles(req, res);
    case "POST":
      return submitArticles(req, res);
    default:
      return res.status(404).send();
  }
}
