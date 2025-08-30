import { MulterError } from "multer";
import { capitalize } from "../utils/index.js";

class BaseService {
  handleResponse(status, success, msg, data) {
    return { status, success, msg, data };
  }

  handleError(err) {
    try {
      if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const value = err.keyValue[field];
        const firstErrorMessage = `${capitalize(field)} already in use.`;
        return this.handleResponse(400, false, firstErrorMessage);
      } else if (err.name === "ValidationError") {
        const firstErrorKey = Object.keys(err.errors)[0];
        const firstErrorMessage = err.errors[firstErrorKey].message;

        return this.handleResponse(400, false, firstErrorMessage);
      } else if (err instanceof MulterError) {
        console.log("multer error", err);
        return this.handleResponse(400, false, err.message);
      } else {
        return this.handleResponse(
          500,
          false,
          err.message || "Something went wrong!"
        );
      }
    } catch (err) {
      return this.handleResponse(500, false, "Something went wrong!");
    }
  }
}

export default BaseService;
