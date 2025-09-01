import { Router } from "express";
import { authCheck, isAdmin } from "../../middlewares/index.js";
import productController from "../../controllers/product.controller.js";
import { uploadImage } from "../../lib/image-uploader.js";

const router = Router();

router.post(
  "/products",
  authCheck,
  isAdmin,
  uploadImage.array("images", 20),
  productController.addProduct
);
router.put(
  "/products/:productId",
  authCheck,
  isAdmin,
  uploadImage.array("images", 20),
  productController.updateProduct
);

router.delete(
  "/products/:productId",
  authCheck,
  isAdmin,
  productController.delete
);

// public
router.get("/products", productController.getAll);
router.get("/products/:productId", productController.getById);

export default router;
