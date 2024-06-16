const express = require("express");
const isAuth = require("../middleware/isAuth");
const { fileController } = require("../controllers");
const router = express.Router();
const upload = require("../middleware/upload")

router.post(
  "/upload",
  isAuth,
  upload.array("image", 3),
  fileController.uploadFile
);

module.exports = router;
