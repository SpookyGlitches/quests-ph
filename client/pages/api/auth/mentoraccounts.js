import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import prisma from "../../../lib/prisma";
// eslint-disable-next-line
export default async function (req, res) {
  if (req.method === "POST") {
    const userInfo = JSON.parse(req.body);
    const rawDate = userInfo.dateOfBirth;
    const dateObj = new Date(rawDate);
    const bdate = dateObj.toISOString();
    const salt = bcrypt.genSaltSync(10);
    const tok = uuidv4();
    const userDetails = {
      email: userInfo.email,
      dateOfBirth: bdate,
      displayName: userInfo.displayName,
      fullName: userInfo.fullName,
      password: bcrypt.hashSync(userInfo.password, salt),
      role: "mentor",
      token: tok,
      experience: userInfo.experience,
      detailedExperience: userInfo.detailedExperience,
      fileUpload: userInfo.fileUpload,
    };
    let fileLength;
    if (userDetails.fileUpload === undefined) {
      userDetails.fileUpload = 0;
    } else {
      fileLength = userDetails.fileUpload.length;
    }

    // eslint-disable-next-line
    const transporter = nodemailer.createTransport({
      port: process.env.MAIL_PORT,
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      secure: true,
    });
    // eslint-disable-next-line
    const mailData = {
      from: process.env.SMTP_USER,
      to: userDetails.email,
      subject: `Verification`,
      html: `<div>
        This is an automated reply from Quests App University of San Carlos. Please do not reply.
        You are receiving this email because your email was just registered to an account on Quests.
        Verify your account through this <a href="${process.env.NEXTAUTH_URL}/verify/${userDetails.token}">link</a>.

    <div>`,
    };

    const checkEmail = await prisma.user.findFirst({
      where: {
        email: userDetails.email,
        deletedAt: null,
      },
    });
    const checkDisplayName = await prisma.user.findFirst({
      where: {
        displayName: userDetails.displayName,
        deletedAt: null,
      },
    });
    if (checkDisplayName && checkEmail) {
      res.status(400).send({ message: "Both" });
    } else if (checkDisplayName) {
      res.status(403).send({ message: "Display Name Exists" });
    } else if (checkEmail) {
      res.status(409).send({ message: "Email Exists" });
    } else if (!checkDisplayName && !checkEmail) {
      // eslint-disable-next-line
      const userCreation = await prisma.user.create({
        data: {
          email: userDetails.email,
          dateOfBirth: userDetails.dateOfBirth,
          displayName: userDetails.displayName,
          fullName: userDetails.fullName,
          password: userDetails.password,
          role: userDetails.role,
          token: userDetails.token,
        },
      });
      if (userCreation) {
        console.log("user created");
        const findUser = await prisma.user.findFirst({
          where: {
            email: userDetails.email,
          },
        });
        if (findUser) {
          console.log("user found");
          const mentorCreation = await prisma.mentorApplication.create({
            data: {
              mentorId: findUser.userId,
              experience: userDetails.experience,
              detailedExperience: userDetails.detailedExperience,
            },
          });
          if (mentorCreation) {
            console.log("mentor created");
            if (userDetails.fileUpload !== 0) {
              for (let i = 0; i < fileLength; i++) {
                // eslint-disable-next-line
                const fileCreation = await prisma.mentorFile.create({
                  data: {
                    mentorUploadId: findUser.userId,
                    path: userDetails.fileUpload[i].path,
                  },
                });
              }
            }
            await transporter.sendMail(mailData, (err, info) => {
              if (err) console.log(err);
              else console.log(info);
            });
          }
          res.status(200).send({ message: "Success!" });
        }
      }
    }

    await prisma.$disconnect();
  }
}
