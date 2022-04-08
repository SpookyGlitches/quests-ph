import prisma from "../../../../lib/prisma";

export default async function getAllArticles(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const articles = await prisma.article.findMany({
      where: {
        deletedAt: null,
        status: "DISAPPROVED",
      },
      select: {
        articleId: true,
        userId: true,
        category: true,
        link: true,
        status: true,
      },
    });
    return res.status(200).json(articles);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
