import { Schema, model } from "mongoose";
import { handleSaveErrors, validateAtUpdate } from "../helpers/index.js";
import { emailRegexp } from "../constants/regexp.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlenth: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", validateAtUpdate);

userSchema.post("save", handleSaveErrors);
userSchema.post("findOneAndUpdate", handleSaveErrors);

const User = model("user", userSchema);

export default User;