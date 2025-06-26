"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUploadUrl = void 0;
const storage_1 = require("@google-cloud/storage");
const base64Key = process.env.GCP_KEY;
if (!base64Key) {
    throw new Error("GCP_KEY env variable is not set");
}
const keyJson = JSON.parse(Buffer.from(base64Key, "base64").toString("utf-8"));
const storage = new storage_1.Storage({
    credentials: keyJson,
});
const getUploadUrl = async (req, res, next) => {
    try {
        const { bucketName, files } = req.body;
        if (!bucketName || !files) {
            return res.status(400).json({
                error: "Missing required fields",
                required: ["bucketName", "file"],
            });
        }
        const results = await Promise.all(files.map(async (file) => {
            const uniqueFileName = `uploads/${Date.now()}-${file.fileName}`;
            const options = {
                version: "v4",
                action: "write",
                expires: Date.now() + 2 * 60 * 1000,
                contentType: file.fileType || "application/octet-stream",
            };
            const [url] = await storage
                .bucket(bucketName)
                .file(uniqueFileName)
                .getSignedUrl(options);
            return {
                url,
                uploadPath: uniqueFileName,
                fileName: file.fileName,
                fileType: file.fileType,
            };
        }));
        res.status(200).json({
            message: "Upload url created successfully",
            data: results,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUploadUrl = getUploadUrl;
