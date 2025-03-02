import nodemailer from "nodemailer";
import "dotenv/config";

const { EMAIL_ADRESS, EMAIL_PASS, EMAIL_HOST } = process.env;

const nodemailerConfig = {
  host: EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_ADRESS,
    pass: EMAIL_PASS,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  const email = { ...data, from: EMAIL_ADRESS };
  console.log("email sender :>> ", email);
  return transport.sendMail(email);
};

export default sendEmail;
