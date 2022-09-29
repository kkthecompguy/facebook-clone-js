const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {
  HTTP_200_OK,
  HTTP_500_INTERNAL_SERVER_ERROR,
  HTTP_400_BAD_REQUEST,
} = require("../utils/status");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../utils/utils");
const UserModel = require("../models/users.models");
const { sendVerificationEmail } = require("../utils/mailer");
dotenv.config();

// controllers object
const controllers = {};

controllers.register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      gender,
      bYear,
      bMonth,
      bDay,
      password,
    } = req.body;
    if (!validateEmail(email))
      return res
        .status(HTTP_400_BAD_REQUEST)
        .json({ message: "invalid email address" });
    if (!validateLength(firstName, 3, 30))
      return res
        .status(HTTP_400_BAD_REQUEST)
        .json({ message: "first name must be between 3 and 30" });
    if (!validateLength(lastName, 3, 30))
      return res
        .status(HTTP_400_BAD_REQUEST)
        .json({ message: "last name must be between 3 and 30" });

    let username = await validateUsername(firstName + lastName);

    const exist = await UserModel.findOne({ email });
    if (exist)
      return res
        .status(HTTP_400_BAD_REQUEST)
        .json({
          message:
            "This email address already exists, try with a different email address",
        });

    const user = new UserModel({
      firstName,
      lastName,
      email,
      gender,
      bYear,
      bMonth,
      bDay,
      username,
      password,
    });
    await user.save();
    const emailVerificationToken = user.getJWT();
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    const result = await sendVerificationEmail(email, firstName, url);
    console.log(result);
    return res
      .status(HTTP_200_OK)
      .json({
        id: user._id.toString(),
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture,
        verified: user.verified,
        email: user.email,
        message: "success! please activate your email to start",
        accessToken: emailVerificationToken,
        tokenType: "Bearer",
      });
  } catch (error) {
    console.log(error);
    return res
      .status(HTTP_500_INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

controllers.activateAccount = async function (req, res) {
  try {
    const { token } = req.body;
    if (!token)
      return res
        .status(HTTP_400_BAD_REQUEST)
        .json({ message: "invalid token or token has expired" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
    if (!user)
      return res
        .status(HTTP_400_BAD_REQUEST)
        .json({ message: "invalid token or token has expired" });
    if (user.verified)
      return res
        .status(HTTP_400_BAD_REQUEST)
        .json({ message: "email is already verified" });
    await UserModel.findByIdAndUpdate(user.id, { verified: true });
    return res
      .status(HTTP_200_OK)
      .json({ message: "account activated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(HTTP_500_INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

controllers.login = async function (req, res) {
  try {
    const { email, password } = req.body;
    if (!email)
      return res
        .status(HTTP_400_BAD_REQUEST)
        .json({ message: "email is required" });
    if (!password)
      return res
        .status(HTTP_400_BAD_REQUEST)
        .json({ message: "password is required" });
    const user = await UserModel.findOne({ email });
    if (!user)
      return res
        .status(HTTP_400_BAD_REQUEST)
        .json({
          message:
            "the email address you entered is not connected to an account",
        });
    const check = await user.comparePass(password);
    if (!check)
      return res
        .status(HTTP_400_BAD_REQUEST)
        .json({ message: "Invalid credentials. please try again" });
    const token = await user.getJWT();
    return res
      .status(HTTP_200_OK)
      .json({
        id: user._id.toString(),
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture,
        verified: user.verified,
        email: user.email,
        message:
          "success",
        accessToken: token,
        tokenType: "Bearer",
      });
  } catch (error) {
    console.log(error);
    return res
      .status(HTTP_500_INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = controllers;
