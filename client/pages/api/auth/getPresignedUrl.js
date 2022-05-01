import { getSession } from "next-auth/react";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../../../lib/s3";

export default async function handler(req, res) {
  try {
    const { user } = await getSession({ req });
    const realKey = `${req.query.key}.${req.query.type}`;
    const bucketParams = {
      Bucket:
        req.query.role === "mentor" && user.role === "admin"
          ? process.env.AWS_BUCKET_NAME_MENTOR
          : process.env.AWS_S3_BUCKET_NAME,
      Key:
        req.query.role === "mentor" && user.role === "admin"
          ? realKey
          : req.query.key,
      Body: "",
    };

    const command = new GetObjectCommand(bucketParams);
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600, // 60s
    });
    res.status(200).json(signedUrl);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
}
