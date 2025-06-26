import { Storage } from "@google-cloud/storage";
import { Request, Response, NextFunction } from "express";

const base64Key = process.env.GCP_KEY;

if (!base64Key) {
  throw new Error("GCP_KEY env variable is not set");
}

const keyJson = JSON.parse(Buffer.from(base64Key, "base64").toString("utf-8"));

interface FilesInterface {
  fileName: string;
  fileType: string;
}
const storage = new Storage({
  credentials: keyJson,
});

export const getUploadUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bucketName, files } = req.body as {
      bucketName: string;
      files: FilesInterface[];
    };

    if (!bucketName || !files) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["bucketName", "file"],
      });
    }

    const results = await Promise.all(
      files.map(async (file) => {
        const uniqueFileName = `uploads/${Date.now()}-${file.fileName}`;
        const options = {
          version: "v4" as const,
          action: "write" as const,
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
      })
    );
    res.status(200).json({
      message: "Upload url created successfully",
      data: results,
    });
  } catch (error: any) {
    next(error);
  }
};
