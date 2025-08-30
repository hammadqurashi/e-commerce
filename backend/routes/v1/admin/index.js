import { Router } from "express";
import { authCheck, isAdmin } from "../../../middlewares";
import productController from "../../../controllers/admin/product.controller";
import { uploadImage } from "../../../lib/image-uploader";

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
router.get("/products", authCheck, isAdmin, productController.getAll);
router.get(
  "/products/:productId",
  authCheck,
  isAdmin,
  productController.getById
);

export default router;
