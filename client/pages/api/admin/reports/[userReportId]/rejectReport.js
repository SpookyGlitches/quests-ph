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

// const nodemailer = require("nodemailer");
// const transporter = nodemailer.createTransport({
//   port: 465,
//   host: "smtp.gmail.com",
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD,
//   },
//   secure: true,
// });
// const mailData = {
//   from: process.env.SMTP_USER,
//   to: userDetails.email,
//   subject: `Verification`,
//   html: `<div>
//     This is an automated reply from Quests App University of San Carlos. Please do not reply.
//     You are receiving this email because your email was just registered to an account on Quests.
//     Verify your account through this link. http://localhost:8080/verify/${userDetails.token}

// <div>`,
// };
