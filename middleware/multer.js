import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads folder if missing
const uploadFolder = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadFolder))
  fs.mkdirSync(uploadFolder, { recursive: true });

// Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-");
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e6);
    cb(null, `${base}-${unique}${ext}`);
  },
});

// Filters
function imageFileFilter(req, file, cb) {
  const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Only images allowed"));
}

// Limits
const limits = {
  fileSize: 5 * 1024 * 1024,
};

// Exported multer instance
export const upload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits,
});
