import { pusher } from "../../../lib/pusher";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  // const { user } = await getSession({ req });
  const { message } = req.body;

  pusher.trigger("presence-channel", "chat-update", {
    message,
    username: "RJ FAJARDO",
  });

  return res.json({ status: 200 });
}
