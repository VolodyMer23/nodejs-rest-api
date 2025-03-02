import "dotenv/config";
const { BASE_URL, EMAIL_ADRESS } = process.env;

const createVerifyEmail = ({ email, verificationToken }) => {
 
  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
  };

  return verifyEmail;
};

export default createVerifyEmail;
