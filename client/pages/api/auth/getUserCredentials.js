import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function getUserCredential(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const { user } = await getSession({ req });

    const foundUser = await prisma.user.findUnique({
      where: {
        userId: user.userId,
      },
    });

    return res.status(200).json(foundUser);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
}
