const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/music");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}.${file.originalname.split(".").pop()}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = ["audio/mpeg", "audio/wav", "audio/flac"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only MP3, WAV and FLAC are allowed."));
  }
};

exports.upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 50, // 50MB limit
  },
});
