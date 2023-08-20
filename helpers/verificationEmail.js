// import { template } from "./index.js";
import "dotenv/config";
const { BASE_URL } = process.env;

const createVerifyEmail = ({ email, verificationToken }) => {
    console.log("email :>> ", email);
    console.log('verificationToken :>> ', verificationToken);
  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
  };

  return verifyEmail;
};

export default createVerifyEmail;
