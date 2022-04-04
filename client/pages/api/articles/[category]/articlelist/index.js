import getMetaData from "metadata-scraper";
import prisma from "../../../../../lib/prisma";

export default async function ShowArticles(req, res) {
  const returnValue = [];
  const urlArr = [];

  async function scrape(url) {
    const data = await getMetaData(url);
    returnValue.push(data);

    return returnValue;
  }

  if (req.method === "GET") {
    console.log(req.query.category);

    const findArticles = await prisma.article.findMany({
      where: {
        category: req.query.category,
        status: "APPROVED",
      },
    });
    for (let x = 0; x < findArticles.length; x++) {
      urlArr[x] = findArticles[x].link;
      // eslint-disable-next-line
      await scrape(urlArr[x]);
    }

    // if (test) {
    //   //console.log(JSON.stringify(test));
    //   console.log(returnValue[0].image);
    // }

    return res.status(200).json(returnValue);
  }
  return res.status(404).json({ message: "Method not allowed " });
}
