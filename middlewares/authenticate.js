import createHttpError from "http-errors";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import jwt from "jsonwebtoken";
import User from "../models/user-db.js";
import "dotenv/config";

const { SECRET_KEY } = process.env;
console.log(SECRET_KEY);

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    console.log("Bearer =",  bearer);
  if (bearer !== "Bearer") {
    throw createHttpError(401, "Not authorized");
  }
  try {
      const { id } = jwt.verify(token, SECRET_KEY);
      console.log(id)
    const user = await User.findById(id);
    if (!user) {
      throw createHttpError(401);
      }
      req.user = user;
    next();
  } catch (error) {
    throw createHttpError(401, error.message);
  }
};

export default ctrlWrapper(authenticate);
