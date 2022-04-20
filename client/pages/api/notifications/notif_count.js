import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function getAllSeenNotification(req, res) {
  if (req.method === "GET") {
    const { user } = await getSession({ req });

    const notifCount = await prisma.notification.count({
      where: {
        view_status: "SEEN",
        userId: user.userId,
      },
    });

    return res.status(200).send(notifCount);
  }
}
