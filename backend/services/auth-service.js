import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import BaseService from "./base-service.js";
import AppConfig from "../config/app-config.js";
import User from "../models/user.js";

class AuthService extends BaseService {
  async createUser(data) {
    try {
      const { userName, email, phone, password, profileImg } = data;

      // const fullName = `${firstName ?? ""} ${lastName ?? ""}`;

      // const stripeCustomerId = await stripeService.createUser(fullName, email);

      // if (!stripeCustomerId) {
      //   return this.handleResponse(
      //     400,
      //     false,
      //     "Error creating account, please try again."
      //   );
      // }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const user = new User({
        userName: userName.trim(),
        email: email.trim(),
        password: hashedPassword,
        isVerified: true,
        role: "user",
        phone: phone.trim(),
        profileImg,
      });

      await user.save();

      const token = jwt.sign(
        {
          id: user._id,
          role: "user",
        },
        AppConfig.jwtSecret,
        {
          expiresIn: "1h",
        }
      );

      return this.handleResponse(200, true, "Account created successfully!", {
        token,
      });
    } catch (err) {
      console.log(err);
      return this.handleError(err);
    }
  }

  async login(data) {
    try {
      const { email, password } = data;

      const user = await User.findOne({ email }).lean();

      if (!user) {
        return this.handleResponse(400, false, "Invalid credentials");
      }

      const isCorrect = bcrypt.compareSync(password, user.password);

      if (!isCorrect) {
        return this.handleResponse(400, false, "Invalid credentials");
      }

      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        AppConfig.jwtSecret,
        {
          expiresIn: "1h",
        }
      );

      return this.handleResponse(200, true, "Login successfull", {
        token,
        role: user.role,
      });
    } catch (err) {
      return this.handleError(err);
    }
  }

  async continueWithGoogle(data) {
    try {
      const { access_token } = data;

      const googleRes = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (!googleRes || !googleRes.data) {
        this.handleResponse(400, false, "Login failed!");
      }

      const userObj = {
        userName: googleRes.data.given_name,
        profileImg: googleRes.data.picture,
        password: googleRes.data.sub,
        phone: googleRes.data.phone,
        email: googleRes.data.email,
      };

      const user = await User.findOne({ email: googleRes.data.email });

      if (!user) {
        const res = await this.createUser(userObj);
        return res;
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        AppConfig.jwtSecret,
        {
          expiresIn: "1h",
        }
      );

      return this.handleResponse(200, true, "Login successfull", {
        token,
      });
    } catch (err) {
      console.log(err);
      return this.handleError(err);
    }
  }

  async getMyDetails(userData) {
    try {
      const { id: userId } = userData;

      const user = await User.findById(userId).lean();

      if (!user) {
        return this.handleResponse(400, false, "UnAuthorized");
      }

      const userDetails = {
        userName: user.userName,
        email: user.email,
        profileImg: user.profileImg,
      };

      return this.handleResponse(200, true, "Auth session.", {
        user: userDetails,
        role: user.role,
      });
    } catch (err) {
      return this.handleError(err);
    }
  }
}

const authService = new AuthService();

export default authService;
