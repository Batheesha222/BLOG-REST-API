const { check } = require("express-validator");
const signupValidator = [
  check("name").notEmpty().withMessage("name is required"),
  check("email").isEmail().withMessage("email is required"),
  check("email").isEmail().withMessage("email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password should be 6 char long")
    .notEmpty()
    .withMessage("password is required"),
];

module.exports = {signupValidator}