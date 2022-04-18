import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

async function updateActive(req, res) {
  try {
    const { user } = await getSession({ req });
    const updateMentor = await prisma.user.update({
      where: {
        userId: user.userId,
      },
      data: {
        isActive: "0",
        updatedAt: new Date(),
      },
    });
    return res.status(200).send(updateMentor);
  } catch (err) {
    return res.status(400).send({ message: "Error" });
  }
}

async function createReapplication(req, res) {
  try {
    const { user } = await getSession({ req });
    const userInfo = req.body.values;
    const fileUpload = req.body.uploadedFiles;
    const fileKeys = req.body.keyArr;

    const transactions = [];
    const createApplication = prisma.mentorApplication.create({
      data: {
        mentorId: user.userId,
        experience: userInfo.experience,
        detailedExperience: userInfo.detailedExperience,
      },
    });
    transactions.push(createApplication);
    const filesLength = fileUpload?.length || 0;
    for (let i = 0; i < filesLength; i++) {
      transactions.push(
        prisma.mentorFile.create({
          data: {
            mentorUploadId: user.userId,
            path: fileUpload[i].path,
            key: fileKeys[i],
          },
        }),
      );
    }
    await prisma.$transaction(transactions);
    return res.status(200).send({ message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "Error" });
  }
}

export default async function handler(req, res) {
  if (req.method === "PUT") {
    await updateActive(req, res);
  } else if (req.method === "POST") {
    await createReapplication(req, res);
  } else {
    res.status(405).send();
  }
}
