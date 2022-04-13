import prisma from "../../../../lib/prisma";

export default async function getOngoingReports(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    // const reports = await prisma.UserReport.findMany({
    //   where: {
    //     status: "ACTIVE",
    //     deletedAt: null,
    //     NOT: [
    //       {
    //         banStart: null,
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
      await prisma.$queryRaw`SELECT userReportId, reporter.fullName AS reporterFullName, recipient.fullName AS recipientFullName, recipient.email AS recipientEmail, reporter.email AS reporterEmail, reporterId, recipientId, category, description, status, userreport.createdAt, SUBSTRING(banStart, 1, 10) AS banStart, SUBSTRING(banEnd, 1, 10) AS banEnd FROM userreport INNER JOIN user reporter ON (reporter.userId = userreport.reporterId) INNER JOIN user recipient ON (recipient.userId = userreport.recipientId) WHERE status = "ACTIVE" AND userreport.deletedAt IS NULL AND banEnd > NOW()`;
    return res.status(200).json(reports);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
