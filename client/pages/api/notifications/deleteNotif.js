import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

/* eslint-disable */
export default async function deleteNotification(req, res) {
  if (req.method !== "PUT") {
    return res.status(400).send("method not allowed");
  }
  const { user } = await getSession({ req });
  const { notificationId } = req.body;
  try {
    const delNotif = await prisma.Notification.update({
      where: {
        notificationId: Number(notificationId),
      },
      data: {
        view_status: "READ",
        deletedAt: new Date(),
      },
    });
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(400).send();
  }
}
