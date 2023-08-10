import express from "express";
import validateBody from "../../decorators/validateBody.js";
import userSchema from "../../schema/user-schema.js";
import authCtrl from "../../controllers/auth-ctrl.js";
import { isEmptyBody } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post(
  "/users/register",
  isEmptyBody,
  validateBody(userSchema.userSingupSchema),
  authCtrl.signup
);

authRouter.post(
  "/users/login",
  isEmptyBody,
  validateBody(userSchema.userSinginSchema),
  authCtrl.signin
);

export default authRouter;
