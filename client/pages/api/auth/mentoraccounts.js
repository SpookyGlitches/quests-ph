import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import prisma from "../../../lib/prisma";
import { awardEarlyUser, isUserEarly } from "../../../helpers/badges/earlyUser";
// eslint-disable-next-line
export default async function (req, res) {
  if (req.method === "POST") {
    const userInfo = req.body.values;
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
      gwa: userInfo.gwa,
      yearLevel: userInfo.yearLevel,
      course: userInfo.course,
      experience: userInfo.experience,
      detailedExperience: userInfo.detailedExperience,
      fileUpload: req.body.uploadedFiles,
      fileKeys: req.body.keyArr,
    };

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
      to: userDetails.email,
      subject: `Verification`,
      html: `<div>
        This is an automated reply from Quests App University of San Carlos. Please do not reply.
        You are receiving this email because your email was just registered to an account on Quests.
        Verify your account through this <a href="${process.env.NEXTAUTH_URL}/verify/${tok}">link</a>.
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
      const early = isUserEarly(new Date());
      const awardOperations = early ? awardEarlyUser() : undefined;
      const userCreation = await prisma.user.create({
        data: {
          email: userDetails.email,
          dateOfBirth: userDetails.dateOfBirth,
          displayName: userDetails.displayName,
          fullName: userDetails.fullName,
          password: userDetails.password,
          role: userDetails.role,
          ...awardOperations,
          verificationToken: {
            create: {
              token: tok,
            },
          },
          userCurrency: {
            create: {
              acceptedArticles: 0,
              completedPublicQuests: 0,
              startedPublicQuests: 0,
              posts: 0,
              postReacts: 0,
              comments: 0,
            },
          },
        },
      });
      // can assume user already exists here since it would throw an error if theyre not yet created at this point
      const transactions = [];
      const mentorCreation = prisma.mentorApplication.create({
        data: {
          mentorId: userCreation.userId,
          gwa: userDetails.gwa,
          yearLevel: userDetails.yearLevel,
          course: userDetails.course,
          experience: userDetails.experience,
          detailedExperience: userDetails.detailedExperience,
        },
      });
      transactions.push(mentorCreation);
      const filesLength = userDetails.fileUpload?.length || 0;
      for (let i = 0; i < filesLength; i++) {
        transactions.push(
          prisma.mentorFile.create({
            data: {
              mentorUploadId: userCreation.userId,
              path: userDetails.fileUpload[i].path,
              key: userDetails.fileKeys[i],
            },
          }),
        );
      }
      // wow i can see my name haha

      await prisma.$transaction(transactions);
      await transporter.sendMail(mailData);
      res.status(200).send({ message: "Success" });
    }
  }
}
