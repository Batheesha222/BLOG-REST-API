const { check } = require("express-validator");

const addCategoryValidator = [
    check("title").notEmpty().withMessage("title is required")
]

module.exports = {addCategoryValidator};