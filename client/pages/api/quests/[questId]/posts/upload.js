import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../../../../../lib/s3";

export default async function handler(req, res) {
  try {
    const bucketParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: req.query.key,
      Body: "",
      ContentType: req.query.type,
    };
    const command = new PutObjectCommand(bucketParams);
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600, // 60s
    });
    res.status(200).json(signedUrl);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
}
