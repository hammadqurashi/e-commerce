import { Router } from "express";
import { authCheck } from "../../../middlewares";
import authController from "../../../controllers/auth.controller";
import { uploadImage } from "../../../lib/image-uploader";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.delete("/continue-with-google", authController.continueWithGoogle);
router.get("/me", authCheck, authController.getMyDetails);

export default router;
