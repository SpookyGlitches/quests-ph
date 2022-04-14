import prisma from "../../../../../lib/prisma";

export default async function ShowArticles(req, res) {
  if (req.method === "GET") {
    const findArticles = await prisma.article.findMany({
      where: {
        category: req.query.category,
        status: "APPROVED",
        deletedAt: null,
      },
      orderBy: {
        approvedAt: "desc",
      },
    });
    return res.status(200).json(findArticles);
  }
  return res.status(404).json({ message: "Method not allowed " });
}
