import prisma from "../../../../lib/prisma";

export default async function getApprovedArticles(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const approvedArticles =
      await prisma.$queryRaw`SELECT articleId, displayName, category, link, SUBSTRING(approvedAt, 1, 10) AS approvedAt  FROM User INNER JOIN Article ON Article.userId = User.userId WHERE approvedAt IS NOT NULL AND Article.deletedAt IS NULL`;
    return res.status(200).json(approvedArticles);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
