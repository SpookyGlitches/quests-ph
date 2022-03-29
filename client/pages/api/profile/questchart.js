import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function getUserChart(req, res) {
  if (req.method === "GET") {
    try {
      const { user } = await getSession({ req });
      const getData = await prisma.quest.findMany({
        where: {
          userId: user.userId,
        },
      });
      return res.status(200).json(getData);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Something went wrong" });
    }
  } else {
    return res.status(404).json({ message: "Method not allowed " });
  }
}
