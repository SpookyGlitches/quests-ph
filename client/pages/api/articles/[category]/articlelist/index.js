import prisma from "../../../../../lib/prisma";

export default async function ShowArticles(req, res) {
  if (req.method === "GET") {
    const { category, search } = req.query;
    try {
      const findArticles = await prisma.article.findMany({
        where: {
          category,
          title: {
            search: search || undefined,
          },
          status: "APPROVED",
          deletedAt: null,
        },
        orderBy: {
          approvedAt: "desc",
        },
      });
      return res.status(200).json(findArticles);
    } catch (err) {
      console.error(err);
      return res.status(500).send();
    }
  }
  return res.status(404).json({ message: "Method not allowed " });
}
