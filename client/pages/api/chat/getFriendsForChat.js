// import axios from "axios";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function getUserCredential(req, res) {
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not allowed " });
  }

  try {
    const { user } = await getSession({ req });

    const foundUsers =
      await prisma.$queryRaw`SELECT userId, displayName, fullName, email, dateOfBirth, role, deletedAt FROM User WHERE userId IN (SELECT IF(userOneId!=${user.userId}, userOneId, userTwoId) AS friendId FROM Friendship WHERE (userOneId = ${user.userId} OR userTwoId = ${user.userId}) AND (Friendship.deletedAt IS NULL))`;

    return res.status(200).json(foundUsers);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
}
