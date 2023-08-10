import User from "../models/user-db.js";
import createHttpError from "http-errors";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createHttpError(409, "Email in use");
  }

  const hashPwd = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPwd });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, "Email or password is wrong");
  }
  const pwdCompare = await bcrypt.compare(password, user.password);
  if (!pwdCompare) {
    throw createHttpError(401, "Email or password is wrong");
  }
    const { SECRET_KEY } = process.env;
    
    const payload = {
        id: user._id
    }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "8h" });
  res.status(201).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
};
