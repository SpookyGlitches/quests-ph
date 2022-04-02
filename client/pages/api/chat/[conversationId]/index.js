import { getSession } from "next-auth/react";
import { pusher } from "../../../../lib/pusher";

async function sendMessage(req, res) {
  const { message, username } = req.body;

  const { user } = await getSession({ req });
  const msg = await prisma.message
    .create({
      data: {
        conversationId: 1,
        userId: user.userId,
        text: message,
      },
    })
    .then(async (msg) => {
      await pusher.trigger("presence-channel", "chat-update", {
        username: msg.username,
        message: msg.text,
      });

      return res.status(200).json(msg, { message: "success" });
    });
}

async function getAllMessages(req, res) {
  try {
    const msgs = await prisma.message.findMany({
      where: {
        conversationId: 1,
      },
    });
    return res.status(200).json(msgs);
  } catch (error) {
    console.log(error);
  }
  return res.status(400).json({ message: "Something went wrong" });
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    await sendMessage(req, res);
  } else if (req.method === "GET") {
    await getAllMessages(req, res);
  }
}
