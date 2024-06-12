const express = require("express")
const router = express.Router();
const {authController} = require("../controllers")
const {signupValidator} = require("../validators/auth")



router.post("/signup",signupValidator,authController.signup)






module.exports = router;