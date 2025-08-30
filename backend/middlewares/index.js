import jwt from "jsonwebtoken";
import AppConfig from "../config/app-config.js";

export const authCheck = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        msg: "Unauthorized!",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, AppConfig.jwtSecret);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      msg: "UnAuthorized!",
    });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== "admin") {
      return res.status(401).json({
        success: false,
        msg: "Unauthorized!",
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      msg: "UnAuthorized!",
    });
  }
};
