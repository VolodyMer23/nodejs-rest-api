import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";

const isValidId = (req, res, next) => {
  const { id } = req.params;
  console.log("ContactId=", id);
  if (!isValidObjectId(id)) {
    return next(createHttpError(400, `Invalid format id`));
  }
  next();
};
export default isValidId;
