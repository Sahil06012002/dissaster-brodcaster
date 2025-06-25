import { Storage } from "@google-cloud/storage";

const storage = new Storage();

async function createBucket(bucketName: string) {
  await storage.createBucket(bucketName);
  console.log(`Bucket ${bucketName} created.`);
}

async function uploadFile(filePath: string, bucketName: string) {
  const options = {
    destination: "destFileName",
  };

  await storage.bucket(bucketName).upload(filePath, options);
  console.log(`${filePath} uploaded to ${bucketName}`);
}
