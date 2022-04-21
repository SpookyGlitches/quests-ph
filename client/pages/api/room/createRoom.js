import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const { user } = await getSession({ req });
  if (req.method === "POST") {
  }
}

/// post request to create room in the daily co using daily api

//https://<your-domain>.daily.co/<room-name>/
