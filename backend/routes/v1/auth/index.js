import { Router } from "express";
import { authCheck } from "../../../middlewares/index.js";
import authController from "../../../controllers/auth.controller.js";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.delete("/continue-with-google", authController.continueWithGoogle);
router.get("/me", authCheck, authController.getMyDetails);

export default router;
