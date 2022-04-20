<<<<<<< HEAD
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

async function /* eslint-disable */ getNotificataion(req, res) {
=======
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

async function getNotificataion(req, res) {
>>>>>>> a0e9c3f9de2ebc3ae67450c749df60be924666e1
  const { user } = await getSession({ req });

  try {
    const notif = await prisma.notification.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: "desc" },
<<<<<<< HEAD
    }); /* eslint-disable */
=======
    });
>>>>>>> a0e9c3f9de2ebc3ae67450c749df60be924666e1

    const parse = notif.map((x) => JSON.parse(x.metadata));

    const badgeIds = parse.map((x) => x.badgeId);

<<<<<<< HEAD
    const results = [];
=======
    let results = [];
    let newArray = [];
>>>>>>> a0e9c3f9de2ebc3ae67450c749df60be924666e1

    // for (let x = 0; x < notif.length; x++) {
    //   const getBadgeInfo = await prisma.badge.findFirst({
    //     where: {
    //       badgeId: badgeIds[x],
    //     },
    //   });
    //   results.push(getBadgeInfo);
    // }

    if (badgeIds) {
      for (let x = 0; x < badgeIds.length; x++) {
        const notification =
<<<<<<< HEAD
          /* eslint-disable */
=======
>>>>>>> a0e9c3f9de2ebc3ae67450c749df60be924666e1
          await prisma.$queryRaw`select n.notificationId, n.userId, n.message, n.type, n.metadata, n.view_status,
          n.createdAt, b.badgeId, b.name, b.description, b.image FROM notification AS n
          INNER JOIN badge AS b ON b.badgeId = ${badgeIds[x]} WHERE n.userId = ${user.userId} ORDER BY n.createdAt DESC`;

        results.push(notification[x]);
      }
    } else {
      console.log("cannot find the notification type");
    }

    console.log(results);

    return res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
}

<<<<<<< HEAD
async function updateSeenRead(req, res) {
=======
async function updateSeen_Read(req, res) {
>>>>>>> a0e9c3f9de2ebc3ae67450c749df60be924666e1
  const { notificationId } = req.body;

  try {
    const update = await prisma.notification.update({
      where: {
        notificationId: Number(notificationId),
      },
      data: {
        view_status: "READ",
      },
    });
<<<<<<< HEAD
    return res.status(200).send(update);
=======
    return res.status(200).send("Updated");
>>>>>>> a0e9c3f9de2ebc3ae67450c749df60be924666e1
  } catch (error) {
    return res.status(400).send();
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getNotificataion(req, res);
    case "PUT":
<<<<<<< HEAD
      return updateSeenRead(req, res);
=======
      return updateSeen_Read(req, res);
>>>>>>> a0e9c3f9de2ebc3ae67450c749df60be924666e1
    default:
      return res.status(404).send();
  }
}
