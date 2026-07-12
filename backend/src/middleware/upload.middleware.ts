import multer from "multer";
import path from "path";
import crypto from "crypto";

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
  const allowed = [
    "video/mp4",
    "video/webm",
    "video/quicktime",
  ];

  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("Unsupported File"));
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
  
  