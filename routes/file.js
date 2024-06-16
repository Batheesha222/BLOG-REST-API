const express = require("express");
const isAuth = require("../middleware/isAuth");
const { fileController } = require("../controllers");
const router = express.Router();
const upload = require("../middleware/upload")

router.post(
  "/upload",
  isAuth,
  upload.single("image"),
  fileController.uploadFile
);

module.exports = router;
