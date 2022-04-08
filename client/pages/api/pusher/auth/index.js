import { getSession } from "next-auth/react";
import { pusher } from "../../../../lib/pusher";

export default async function authenticatePusherHandler(req, res) {
  const { socket_id, channel_name } = req.body;

  const { user } = await getSession({ req });

  const presenceData = {
    user_id: user.userId,
    user_info: {
      username: user.fullName,
    },
  };

  console.log(req.body);
  try {
    const auth = pusher.authenticate(socket_id, channel_name, presenceData);
    res.send(auth);
  } catch (err) {
    console.log(err);
  }
}
