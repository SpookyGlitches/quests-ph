<<<<<<< HEAD
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function getAllSeenNotification(req, res) {
  if (req.method !== "GET") {
    return res.status(400).send("method not allowed");
  }
  const { user } = await getSession({ req });

  const notifCount = await prisma.notification.count({
    where: {
      view_status: "SEEN",
      userId: user.userId,
    },
  });

  return res.status(200).send(notifCount);
=======
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
>>>>>>> a0e9c3f9de2ebc3ae67450c749df60be924666e1
}
