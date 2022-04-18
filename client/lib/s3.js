// Create service client module using ES6 syntax.
import { S3Client } from "@aws-sdk/client-s3";
// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});
// eslint-disable-next-line import/prefer-default-export
export { s3Client };
