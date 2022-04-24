import prisma from "../../../../../lib/prisma";

export default async function getApprovedFiles(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }
  try {
    const obtainExperience = await prisma.mentorApplication.findMany({
      where: {
        mentorId: req.query.mentorId,
      },
    });
    const obtainFile = await prisma.mentorFile.findMany({
      where: {
        mentorUploadId: req.query.mentorId,
      },
    });
    return res
      .status(200)
      .json({ experience: obtainExperience, files: obtainFile });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
