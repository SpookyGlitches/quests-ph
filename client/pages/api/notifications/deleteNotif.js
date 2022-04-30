import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function deleteNotification(req, res) {
  if (req.method === "PUT") {
    const { user } = await getSession({ req });
    const { notificationId } = req.body;
    try {
      const delNotif = await prisma.notification.update({
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
      return res.status(400).send();
    }
  }
}
