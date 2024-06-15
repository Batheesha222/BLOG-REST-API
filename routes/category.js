const express = require("express");
const router = express.Router();
const { categoryController } = require("../controllers");
const { addCategoryValidator } = require("../validators/category");
const validate = require("../validators/validator");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");

router.post(
  "/",
  isAuth,
  isAdmin,
  addCategoryValidator,
  validate,
  categoryController.addCategory
);

module.exports = router;
