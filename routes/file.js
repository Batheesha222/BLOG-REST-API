const express = require("express");
const isAuth = require("../middleware/isAuth");
const { fileController } = require("../controllers");
const router = express.Router();
const upload = require("../middleware/upload");

router.post(
  "/upload",
  isAuth,
  upload.single("image"),
  fileController.uploadFile
);

router.get("/signed-url",isAuth,fileController.getSignedUrl)


router.delete("/delete-file",isAuth,fileController.deleteFile)


module.exports = router;
