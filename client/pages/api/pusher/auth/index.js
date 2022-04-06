import { pusher } from "../../../../lib/pusher";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  // const { user } = await getSession({ req });
  //we authenticate the user
  const { socket_id, channel_name } = req.body;

  const presenceData = {
    user_id: "cl1hst0py00060wji6mza9wdq",
    user_info: {
      username: "RJ",
    },
  };

  try {
    const auth = pusher.authenticate(socket_id, channel_name, presenceData);
    res.send(auth);
  } catch (err) {
    return res.json({ message: "Authorization Failure" });
  }
}
