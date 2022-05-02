import prisma from "../../../../../lib/prisma";

export default async function articleHandler(req, res) {
  if (req.method !== "GET") {
    return res.status(401).send();
  }
  try {
    const articleInfo = await prisma.article.findUnique({
      where: {
        articleId: Number(req.query.articleId),
      },
    });

    return res.status(200).json(articleInfo);
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "something went wrong" });
  }
}
