import prisma from "../../../../lib/prisma";

export default async function getCompletedReports(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    // const reports = await prisma.UserReport.findMany({
    //   where: {
    //     deletedAt: null,
    //     NOT: [
    //       {
    //         banStart: null,
    //         banEnd: null,
    //       },
    //     ],
    //   },
    //   select: {
    //     userReportId: true,
    //     recipientId: true,
    //     category: true,
    //     description: true,
    //     status: true,
    //     createdAt: true,
    //     banStart: true,
    //     banEnd: true,
    //   },
    // });
    const reports =
      await prisma.$queryRaw`SELECT userReportId, Reporter.fullName AS reporterFullName, Recipient.fullName AS recipientFullName, Recipient.email AS recipientEmail, Reporter.email AS reporterEmail, reporterId, recipientId, category, description, status, UserReport.createdAt, SUBSTRING(banStart, 1, 10) AS banStart, SUBSTRING(banEnd, 1, 10) AS banEnd FROM UserReport INNER JOIN User Reporter ON (Reporter.userId = UserReport.reporterId) INNER JOIN User Recipient ON (Recipient.userId = UserReport.recipientId) WHERE UserReport.deletedAt IS NOT NULL AND banStart IS NOT NULL AND banEnd < NOW()`;
    return res.status(200).json(reports);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
