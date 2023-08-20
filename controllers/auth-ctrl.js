import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import User from "../models/user-db.js";
import createHttpError from "http-errors";
import { nanoid } from "nanoid";
import { createVerifyEmail, sendEmail } from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import "dotenv/config";

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createHttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);
  const hashPwd = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPwd,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = createVerifyEmail({ email, verificationToken });
  console.log('verifyEmail :>> ', verifyEmail);
  // const verify = await sendEmail(verifyEmail);
  console.log("verify :>> ", verify);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw createHttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({
    message: "Verification successful",
  });
};

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, "Email not found");
  }
  if (user.verify) {
    throw createHttpError(400, "Verification has already been passed");
  }

  const verifyEmail = createVerifyEmail({
    email,
    verificationToken: user.verificationToken,
  });
  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw createHttpError(401, "Email not verified");
  }

  const pwdCompare = await bcrypt.compare(password, user.password);

  if (!pwdCompare) {
    throw createHttpError(401, "Email or password is wrong");
  }

  const { SECRET_KEY } = process.env;

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "8h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { subscription, email } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({});
};

export default {
  signup: ctrlWrapper(signup),
  verify: ctrlWrapper(verify),
  resendVerificationEmail: ctrlWrapper(resendVerificationEmail),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
