import prisma from "../../../../lib/prisma";

export default async function getAllArticles(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const articles =
      await prisma.$queryRaw`SELECT articleId, displayName, category, link FROM User INNER JOIN Article ON Article.userId = User.userId WHERE approvedAt IS NULL AND Article.updatedAt IS NULL AND Article.deletedAt IS NULL`;
    return res.status(200).json(articles);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
