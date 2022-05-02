import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
// eslint-disable-next-line
async function createReport(req, res) {
  if (req.method === "POST") {
    const { user } = await getSession({ req });
    const createUserReport = await prisma.userReport.create({
      data: {
        reporterId: user.userId,
        recipientId: req.query.userId,
        category: req.body.values.category,
        description: req.body.values.reportDetails,
        screenshot: req.body.reportUpload,
      },
    });

    res.status(200).send(createUserReport);
  }

  await prisma.$disconnect();
}

async function checkReport(req, res) {
  const reportValues = [];
  try {
    const { user } = await getSession({ req });

    const checkSpamming = await prisma.userReport.findMany({
      where: {
        reporterId: user.userId,
        recipientId: req.query.userId,
        category: "Spamming",
        deletedAt: null, // if deletedAt has a date, user can report again
      },
    });
    if (checkSpamming) {
      reportValues.push(checkSpamming);
    }
    const checkHarassment = await prisma.userReport.findMany({
      where: {
        reporterId: user.userId,
        recipientId: req.query.userId,
        category: "Harassment",
        deletedAt: null, // if deletedAt has a date, user can report again
      },
    });
    if (checkHarassment) {
      reportValues.push(checkHarassment);
    }
    const checkFraud = await prisma.userReport.findMany({
      where: {
        reporterId: user.userId,
        recipientId: req.query.userId,
        category: "Fraud",
        deletedAt: null, // if deletedAt has a date, user can report again
      },
    });
    if (checkFraud) {
      reportValues.push(checkFraud);
    }
    const checkOthers = await prisma.userReport.findMany({
      where: {
        reporterId: user.userId,
        recipientId: req.query.userId,
        category: "Others",
        deletedAt: null, // if deletedAt has a date, user can report again
      },
    });
    if (checkOthers) {
      reportValues.push(checkOthers);
    }
    return res.status(200).send(reportValues);
  } catch (err) {
    return res.status(400).send({ message: "Error" });
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    await checkReport(req, res);
  } else if (req.method === "POST") {
    await createReport(req, res);
  } else {
    res.status(405).send();
  }
}
