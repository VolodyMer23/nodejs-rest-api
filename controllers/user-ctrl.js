import fs from "fs/promises";
import gravatar from "gravatar";
import User from "../models/user-db.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import "dotenv/config";
import Jimp from "jimp";
import path from "path";

const { PORT } = process.env;

const avatarsDir = path.resolve("public", "avatars");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  if (!user) {
    throw createHttpError(404, "missing field");
  }
  res.json({
    email: user.email,
    subscription: user.subscription,
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  console.log("tempUpload", tempUpload);
  const extension = originalname.split(".").pop();
  const filename = `${_id}.${extension}`;

  Jimp.read(tempUpload, (err, image) => {
    if (err) throw err;
    image.resize(250, 250).quality(60).write(`./public/avatars/${filename}`);
  });

  const uploadData = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, uploadData);

  const avatarURL = path.join(`http://localhost:${PORT}/avatars`, filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

export default {
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
