import { capitalize } from "../utils/index.js";

const handleError = (err) => {
  try {
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      const value = err.keyValue[field];
      const firstErrorMessage = `${capitalize(field)} already in use.`;
      return { status: 400, success: false, msg: firstErrorMessage };
    } else if (err.name === "ValidationError") {
      const firstErrorKey = Object.keys(err.errors)[0];
      const firstErrorMessage = err.errors[firstErrorKey].message;

      return { status: 400, success: false, msg: firstErrorMessage };
    } else {
      return {
        status: 500,
        success: false,
        msg: err.message || "Something went wrong!",
      };
    }
  } catch (err) {
    return { status: 500, success: false, msg: "Something went wrong!" };
  }
};

const globalErrorHandler = (err, req, res, next) => {
  const { msg, status, success } = handleError(err);

  return res.status(status).json({ success, msg });
};

export default globalErrorHandler;
