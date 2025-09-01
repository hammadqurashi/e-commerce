import { Router } from "express";
import { authCheck } from "../../../middlewares/index.js";
import userController from "../../../controllers/user/checkout.controller.js";

const router = Router();

router.post(
  "/create-checkout",
  authCheck,
  userController.createCheckoutSession
);

export default router;
