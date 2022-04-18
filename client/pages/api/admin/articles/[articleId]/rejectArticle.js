import prisma from "../../../../../lib/prisma";

export default async function rejectArticle(req, res) {
  if (req.method !== "PUT") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const disapprovedArticle = await prisma.article.update({
      where: {
        articleId: Number(req.query.articleId),
      },
      data: {
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    });
    return res.status(200).json(disapprovedArticle);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
