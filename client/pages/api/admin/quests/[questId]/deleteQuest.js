import prisma from "../../../../../lib/prisma";

export default async function deleteQuest(req, res) {
  if (req.method !== "PUT") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    // Will fix this later since messy pa ang pag implement.

    // // Delete party member
    // const deleteParty = await prisma.partyMember.update({
    //   where: {
    //     userId: String(req.query.userId),
    //   },
    //   data: {
    //     deletedAt: new Date(),
    //   },
    // });
    // // Delete posts
    // const deletePost = await prisma.post.update({
    //   where: {
    //     userId: String(req.query.userId),
    //   },
    //   data: {
    //     deletedAt: new Date(),
    //   },
    // });
    // // Delete post file
    // const deletePostFile = await prisma.postFile.update({
    //   where: {
    //     userId: String(req.query.userId),
    //   },
    //   data: {
    //     deletedAt: new Date(),
    //   },
    // });
    // // Delete quests
    // const deleteQuest = await prisma.quest.update({
    //   where: {
    //     userId: String(req.query.userId),
    //   },
    //   data: {
    //     deletedAt: new Date(),
    //   },
    // });
    // // Delete quest mentorship
    // const deleteMentorReq = await prisma.questMentorshipRequest.update({
    //   where: {
    //     OR: [
    //       {
    //         partyLeaderId: String(req.query.userId),
    //       },
    //       {
    //         mentorId: String(req.query.userId),
    //       },
    //     ],
    //   },
    //   data: {
    //     deletedAt: new Date(),
    //   },
    // });
    // // Delete quest task
    // const deleteQuestTask = await prisma.questTask.update({
    //   where: {
    //     userId: String(req.query.userId),
    //   },
    //   data: {
    //     deletedAt: new Date(),
    //   },
    // });

    // For now I just set isActive to 0 and deletedAt to the current date.
    const deletedQuest = await prisma.quest.update({
      where: {
        questId: Number(req.query.questId),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return res.status(200).json(deletedQuest);
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
