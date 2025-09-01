import authService from "../services/auth-service.js";

const authController = {
  signup: async (req, res) => {
    const { userName, email, phone, password } = req.body;

    const { data, msg, status, success } = await authService.createUser({
      userName,
      email,
      phone,
      password,
    });

    return res.status(status).json({ success, msg, data });
  },

  login: async (req, res) => {
    const { data, msg, status, success } = await authService.login(req.body);

    return res.status(status).json({ success, msg, data });
  },

  continueWithGoogle: async (req, res) => {
    const { data, msg, status, success } = await authService.continueWithGoogle(
      req.body
    );

    return res.status(status).json({ success, msg, data });
  },

  // Authorized api
  getMyDetails: async (req, res) => {
    const { data, msg, status, success } = await authService.getMyDetails(
      req.user
    );

    return res.status(status).json({ success, msg, data });
  },
};

export default authController;
