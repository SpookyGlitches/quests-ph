import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../../../../lib/s3";

export default async function handler(req, res) {
  const bucketParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: req.query.key,
  };
  try {
    const data = await s3Client.send(new DeleteObjectCommand(bucketParams));
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send();
  }
}
