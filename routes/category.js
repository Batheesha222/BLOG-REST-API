const express = require("express");
const router = express.Router();
const { categoryController } = require("../controllers");
const { addCategoryValidator, idValidator } = require("../validators/category");
const validate = require("../validators/validator");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");
const { deleteCategory } = require("../controllers/category");

router.post(
  "/",
  isAuth,
  isAdmin,
  addCategoryValidator,
  validate,
  categoryController.addCategory
);

router.put(
  "/:id",
  isAuth,
  isAdmin,
  idValidator,
  validate,
  categoryController.updateCategory
);

router.delete(
  "/:id",
  isAuth,
  isAdmin,
  idValidator,
  validate,
  categoryController.deleteCategory
);
module.exports = router;
