import prisma from "../../../../../lib/prisma";

export default async function approveArticle(req, res) {
  if (req.method !== "PUT") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const disapprovedArticle = await prisma.UserReport.update({
      where: {
        userReportId: Number(req.query.userReportId),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return res.status(200).json(disapprovedArticle);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
