import nodemailer from "nodemailer";
import prisma from "../../../../../lib/prisma";

export default async function rejectApplication(req, res) {
  if (req.method !== "PUT") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const getUser = await prisma.user.findFirst({
      where: {
        userId: req.query.mentorId,
      },
    });
    const transactions = [];
    const rejectedUser = prisma.user.update({
      where: {
        userId: req.query.mentorId,
      },
      data: {
        isActive: "2", // "2" for now since not sure how to handle rejected. Basta I know it can't be zero.
        updatedAt: new Date(),
      },
    });
    transactions.push(rejectedUser);
    const setDeletedAtFile = prisma.mentorFile.updateMany({
      where: {
        mentorUploadId: req.query.mentorId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    transactions.push(setDeletedAtFile);
    const setDeletedAtApplication = prisma.mentorApplication.updateMany({
      where: {
        mentorId: req.query.mentorId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    transactions.push(setDeletedAtApplication);

    const transporter = nodemailer.createTransport({
      port: process.env.MAIL_PORT,
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      secure: true,
    });
    const mailData = {
      from: process.env.SMTP_USER,
      to: getUser.email,
      subject: `Mentor Application`,
      html: `<div>
      Greetings, ${getUser.displayName}!
        This is an automated reply from Quests App University of San Carlos. Please do not reply.
        Thank you for your application as a mentor of Quests. However, after carefully reviewing your application,
        we have decided to pursue other applicants whom we feel more closely meet our needs at this time. <br/>
        You can, however, apply again if you wish to. You may submit your reapplication in the <b>Requests</b>
        tab of your account. Thank you and have a great day! <br/>
        <b>Additional Remarks:</b> ${req.body.values}
    <div>`,
    };
    await prisma.$transaction(transactions);
    await transporter.sendMail(mailData);
    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
