import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

async function /* eslint-disable */ getNotificataion(req, res) {
  const { user } = await getSession({ req });

  try {
    const notif = await prisma.Notification.findMany({
      where: { userId: user.userId, deletedAt: null },
      orderBy: { createdAt: "desc" },
    });

    // console.log(notif);

    // const notif_type = notif.map((x) => x.type);

    // const parse = notif.map((x) => JSON.parse(x.metadata));

    // const badgeIds = parse.map((x) => x.badgeId);

    // const userIds = parse.map((x) => x.userId);

    // // const filterUserID = userId.filter((x) => x !== "undefined");

    // console.log(badgeIds);
    // console.log(userId);

    // const results = [];

    // if (notif.type === "RECEIVED_BADGE" && badgeIds) {
    //   for (let x = 0; x < badgeIds.length; x++) {
    //     const notification =
    //       /* eslint-disable */
    //       await prisma.$queryRaw`select n.notificationId, n.userId, n.message, n.type, n.metadata, n.view_status,
    //       n.createdAt, b.badgeId, b.name, b.description, b.image FROM Notification AS n
    //       INNER JOIN Badge AS b ON b.badgeId = ${badgeIds[x]} WHERE n.userId = ${user.userId} ORDER BY n.createdAt DESC`;

    //     results.push(notification[x]);
    //   }
    // } else if(notif.type === "FRIEND_REQUEST" && userIds){
    //   console.log("cannot find the notification type");
    // }

    return res.status(200).json(notif);
  } catch (err) {
    console.log(err);
    return res.status(400).send();
  }
}

async function updateSeenRead(req, res) {
  const { notificationId } = req.body;

  try {
    const update = await prisma.Notification.update({
      where: {
        notificationId: Number(notificationId),
      },
      data: {
        view_status: "READ",
      },
    });
    return res.status(200).send(update);
  } catch (error) {
    return res.status(400).send();
  }
}

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getNotificataion(req, res);
    case "PUT":
      return updateSeenRead(req, res);
    default:
      return res.status(404).send();
  }
}
