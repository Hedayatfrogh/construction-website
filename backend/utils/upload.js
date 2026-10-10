const crypto = require("crypto");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const uploadDirectory = path.join(__dirname, "..", "Uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });

const extensionsByMime = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
};

// Multer storage cofuguration

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, uploadDirectory),
  filename: (_req, file, callback) => {
    callback(
      null,
      `${crypto.randomBytes(16).toString("hex")}${
        extensionsByMime[file.mimetype]
      }`,
    );
  },
});

// File filter for images
const fileFilter = (_req, file, callback) => {
  if (!extensionsByMime[file.mimetype]) {
    return callback(new Error("Upload a JPEG, PNG, WebP, GIF, or AVIF image."));
  }
  callback(null, true);
};
// Multer upload cofugrution

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
});

module.exports = upload;
