import prisma from "../../../lib/prisma";
// eslint-disable-next-line
export default async function (req, res) {
  // eslint-disable-next-line
  require("dotenv").config();
  if (req.method === "POST") {
    const userDetails = JSON.parse(req.body);
    // eslint-disable-next-line
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      secure: true,
    });
    const mailData = {
      from: process.env.SMTP_USER,
      to: userDetails.email,
      subject: `Verification`,
      html: `<div> 
        This is an automated reply from Quests App University of San Carlos. Please do not reply.
        You are receiving this email because your email was just registered to an account on Quests.
        Verify your account through this <a href="http://localhost:3000/verify/${userDetails.token}">link</a>.
        
        
    <div>`,
    };

    const checkEmail = await prisma.user.findUnique({
      where: {
        email: userDetails.email,
      },
    });
    const checkDisplayName = await prisma.user.findUnique({
      where: {
        displayName: userDetails.displayName,
      },
    });
    if (checkDisplayName && checkEmail) {
      res.status(514).send({ message: "Both" });
    } else if (checkDisplayName) {
      res.status(513).send({ message: "Display Name Exists" });
    } else if (checkEmail) {
      res.status(512).send({ message: "Email Exists" });
    } else if (!checkDisplayName && !checkEmail) {
      await prisma.user.create({ data: userDetails });
      transporter.sendMail(mailData, (err, info) => {
        if (err) console.log(err);
        else console.log(info);
      });
      res.status(200).send({ message: "Success!" });
    }

    await prisma.$disconnect();
  }
}
