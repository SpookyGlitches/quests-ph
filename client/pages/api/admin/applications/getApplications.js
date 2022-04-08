import prisma from "../../../../lib/prisma";

export default async function getAllApplications(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const applications = await prisma.MentorApplication.findMany();
    return res.status(200).json(applications);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
}
