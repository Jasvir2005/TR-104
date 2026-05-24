const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const uploadPath = path.join(__dirname, "../uploads");

// create folder if missing
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});

const upload = multer({ storage });

router.post(
  "/audio",
  upload.single("audio"),
  (req, res) => {
    res.json({
      url: `http://localhost:5000/uploads/${req.file.filename}`,
    });
  }
);

module.exports = router;