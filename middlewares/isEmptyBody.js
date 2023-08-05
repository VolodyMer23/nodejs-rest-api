import createHttpError from "http-errors";

const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    next(createHttpError(400, "Body need requied fields"));
  }
  next();
};

export default isEmptyBody;
