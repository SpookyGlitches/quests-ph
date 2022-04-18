import prisma from "../../../../lib/prisma";

export default async function getAllArticles(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const articles =
      await prisma.$queryRaw`SELECT articleId, fullName, category, link FROM user INNER JOIN article ON article.userId = user.userId WHERE approvedAt IS NULL AND article.updatedAt IS NULL`;
    return res.status(200).json(articles);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
