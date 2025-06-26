"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("@google-cloud/storage");
const storage = new storage_1.Storage();
async function createBucket(bucketName) {
    await storage.createBucket(bucketName);
    console.log(`Bucket ${bucketName} created.`);
}
async function uploadFile(filePath, bucketName) {
    const options = {
        destination: "destFileName",
    };
    await storage.bucket(bucketName).upload(filePath, options);
    console.log(`${filePath} uploaded to ${bucketName}`);
}
