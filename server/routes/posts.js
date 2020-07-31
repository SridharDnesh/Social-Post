const express = require("express");
const router = express.Router();

const fs = require("fs");
const Image = require("../db/models/Posts");

/**
 * MULTER CONFIG
 */
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./fileupload/photos");
  },
  filename: function (req, file, cb) {
    const mime = file.mimetype.split("/");
    const extname = mime[mime.length - 1];
    const fileNamePattern = Date.now() + "." + extname;
    cb(null, file.fieldname + "-" + fileNamePattern);
  },
});

const upload = multer({ storage: storage });
//

router.post("/upload", upload.single("photo"), (req, res) => {
  var newImage = new Image();
  newImage.img.data = fs.readFileSync(req.file.path);
  newImage.img.contentType = req.file.mimetype;
  newImage.save((err, saved) => {
    console.log("======saved image======");
    console.log(saved);
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Internal server error occured",
        error: err,
      });
    }
    res.json({
      success: true,
      message: "Image stored successfully",
    });
  });
});

router.get("/image", (req, res) => {
  Image.findOne({}, (err, image) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal server error occured",
        error: err,
      });
    }
    if (image) {
      console.log("====Retrieved Image====");
      console.log(image);
      res.status(200).json({
        success: true,
        message: "Image successfully found",
        imageData: image,
      });
    }
  }).sort({ createdAt: "desc" });
});

module.exports = router;
