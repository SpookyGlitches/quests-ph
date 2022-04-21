import prisma from "../../../../lib/prisma";

export default async function getAllReports(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    // const reports = await prisma.UserReport.findMany({
    //   where: {
    //     status: "INACTIVE",
    //     deletedAt: null,
    //     banStart: null,
    //     banEnd: null,
    //   },
    //   select: {
    //     userReportId: true,
    //     reporterId: true,
    //     recipientId: true,
    //     category: true,
    //     description: true,
    //     status: true,
    //     createdAt: true,
    //   },
    // });
    const reports =
      await prisma.$queryRaw`SELECT userReportId, Reporter.fullName AS reporterFullName, Recipient.fullName AS recipientFullName, Recipient.email AS recipientEmail, Reporter.email AS reporterEmail, reporterId, recipientId, category, description, status, UserReport.createdAt FROM UserReport INNER JOIN User Reporter ON (Reporter.userId = UserReport.reporterId) INNER JOIN User Recipient ON (Recipient.userId = UserReport.recipientId) WHERE status = "INACTIVE" AND UserReport.deletedAt IS NULL AND banStart IS NULL AND banEnd IS NULL`;
    return res.status(200).json(reports);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
