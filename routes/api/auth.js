import express from "express";
import userSchema from "../../schema/user-schema.js";
import authCtrl from "../../controllers/auth-ctrl.js";
import { isEmptyBody, authenticate } from "../../middlewares/index.js";
import {validateBody} from "../../helpers/index.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userSchema.userSingupSchema),
  authCtrl.signup
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userSchema.userSinginSchema),
  authCtrl.signin
);

authRouter.get(
  "/current",
  authenticate,
  authCtrl.getCurrent
);


authRouter.post("/logout", authenticate, authCtrl.logout);

authRouter.patch(
  "/",
  authenticate,
  validateBody(userSchema.subscriptionSchema),
  authCtrl.updateSubscription
);

export default authRouter;
