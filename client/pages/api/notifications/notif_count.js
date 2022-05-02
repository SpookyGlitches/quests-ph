import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function getAllSeenNotification(req, res) {
  if (req.method !== "GET") {
    return res.status(400).send("method not allowed");
  }
  const { user } = await getSession({ req });

  const notifCount = await prisma.Notification.count({
    where: {
      view_status: "SEEN",
      userId: user.userId,
    },
  });

  return res.status(200).send(notifCount);
}
