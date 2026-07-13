import multer from "multer";
import path from "path";
import crypto from "crypto";
import { AppError } from "../utils/app-error.js";

const storage = multer.diskStorage({

  destination(req, file, cb) {

    cb(null, "uploads/videos");

  },

  filename(req, file, cb) {

    const extension =
      path.extname(file.originalname);

    const filename =
      crypto.randomUUID() + extension;

    cb(null, filename);

  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const supportedExtensions = new Set([
    ".3gp", ".avi", ".m4v", ".mkv", ".mov", ".mp4", ".mpeg", ".mpg", ".webm",
  ]);
  const extension = path.extname(file.originalname).toLowerCase();
  const isVideo = file.mimetype.startsWith("video/") ||
    (file.mimetype === "application/octet-stream" && supportedExtensions.has(extension));

  if (!isVideo) {
    return cb(new AppError(415, "Please select a supported video file."));
  }

  cb(null, true);
};

const limits = {
  fileSize: 1024 * 1024 * 500,
};

export const upload = multer({
  storage,
  fileFilter,
  limits,
});
