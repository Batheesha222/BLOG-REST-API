const { User } = require("../models");
const hashPassword = require("../utils/hashPassword");
const comparePassword = require("../utils/comparePassword");
const generateToken = require("../utils/generateToken");
const generateCode = require("../utils/generateCode");
const sendEmail = require("../utils/sendEmail")


const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      res.code = 400;
      throw new Error("Email already exist");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({ name, email, password: hashedPassword, role });

    await newUser.save();
    res.status(201).json({
      code: 201,
      status: true,
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 401;
      throw new Error("Invalid credentials");
    }
    const match = await comparePassword(password, user.password);

    if (!match) {
      res.code = 401;
      throw new Error("Invalid Credentials");
    }

    const token = generateToken(user);
    res.status(200).json({
      code: 200,
      status: true,
      message: "User signin successfully",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

const verifyCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }

    if (user.isVerified) {
      res.code = 400;
      throw new Error("User already verified");
    }

    const code = generateCode(6);

    user.verificationCode = code;
    await user.save();

    //send email
    await sendEmail({
      emailTo: user.email,
      subject:"Email verification code",
      code,
      content: "verify your account",
    })

    res
      .status(200)
      .json({
        code: 200,
        status: true,
        message: "user verification code successfully",
      });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin, verifyCode };
