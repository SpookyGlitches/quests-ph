import { pusher } from "../../../../../lib/pusher";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";

async function sendMessage(req, res) {
  try {
    const { message, username } = req.body;

    const socket_id = pusher.connection.socket_id;

    pusher.trigger("messages", "inserted", {
      username,
      message,
      createdAt,
    });

    // const msg = await prisma.message.create({
    //   data: {
    //     conversationId: pusher.connection.socket_id,
    //     userId: user.userId,
    //     text: message,
    //   },
    // });

    return res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(404).send("error");
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    await sendMessage(req, res);
  }
}
