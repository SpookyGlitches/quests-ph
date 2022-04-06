import { pusher } from "../../../lib/pusher";
import { getSession } from "next-auth/react";

//handle channel handler
export default async function handler(req, res) {
  const { user } = await getSession({ req });
  const { message } = req.body;

  await pusher.trigger("chat", "chat-event", {
    message,
    username: user.name,
  });
  res.json({ message: "message sent" });
}
