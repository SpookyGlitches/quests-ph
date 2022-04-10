// import { PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { s3Client } from "../../../lib/s3";

export default async function handler(req, res) {
  try {
    console.log(req.query.key);
    console.log(req.query.type);
    // const bucketParams = {
    //   Bucket: process.env.AWS_BUCKET_NAME,
    //   Key: req.query.key,
    //   Body: "",
    //   ContentType: req.query.type,
    // };
    // const command = new PutObjectCommand(bucketParams);
    // const signedUrl = await getSignedUrl(s3Client, command, {
    //   expiresIn: 3600, // 60s
    // });
    // res.status(200).json(signedUrl);
    res.status(200).json({ message: "hola" });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
}
