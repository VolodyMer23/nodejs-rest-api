import express from "express";
import userSchema from "../../schema/user-schema.js";
import authCtrl from "../../controllers/auth-ctrl.js";
import userCtrl from "../../controllers/user-ctrl.js";
import { isEmptyBody, authenticate, upload } from "../../middlewares/index.js";
import { validateBody } from "../../helpers/index.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userSchema.userSingupSchema),
  authCtrl.signup
);

authRouter.get("/verify/:verificationToken", authCtrl.verify);

authRouter.post(
  "/verify",
  validateBody(userSchema.verifyEmailSchema),
  authCtrl.resendVerificationEmail
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userSchema.userSinginSchema),
  authCtrl.signin
);

authRouter.get("/current", authenticate, authCtrl.getCurrent);

authRouter.post("/logout", authenticate, authCtrl.logout);

authRouter.patch(
  "/",
  authenticate,
  validateBody(userSchema.subscriptionSchema),
  userCtrl.updateSubscription
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  userCtrl.updateAvatar
);

export default authRouter;
