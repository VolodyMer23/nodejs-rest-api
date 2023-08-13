import express from "express";
import userSchema from "../../schema/user-schema.js";
import authCtrl from "../../controllers/auth-ctrl.js";
import { isEmptyBody, authenticate } from "../../middlewares/index.js";
import validateBody from "../../helpers/validateBody.js";

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

authRouter.get(
  "/users/current",
  authenticate,
  authCtrl.getCurrent
);


authRouter.post("/users/logout", authenticate, authCtrl.logout);

export default authRouter;
