import { Schema, model } from "mongoose";
import {handleSaveErrors, validateAtUpdate} from '../helpers/index.js'
import { emailRegexp } from "../constants/regexp.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailRegexp,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.pre("findOneAndUpdate", validateAtUpdate);

contactSchema.post("save", handleSaveErrors);
contactSchema.post("findOneAndUpdate", handleSaveErrors);
const Contact = model("contact", contactSchema);

export default Contact;
