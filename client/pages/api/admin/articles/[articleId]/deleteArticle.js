import prisma from "../../../../../lib/prisma";

export default async function deleteArticle(req, res) {
  if (req.method !== "PUT") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const deletedArticle = await prisma.article.update({
      where: {
        articleId: Number(req.query.articleId),
      },
      data: {
        deletedAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return res.status(200).json(deletedArticle);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
