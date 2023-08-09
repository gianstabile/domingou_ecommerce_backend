import { Router } from "express";
import { uploader } from "../utils/utils.js";
import ProductController from "../controllers/products.controller.js";
import { authentication, authorize } from "../middlewares/auth.js";

const router = Router();
const productController = new ProductController();

router.get("/", productController.getProducts);
router.get("/:pid", productController.getProductById);
router.post("/", authentication(), authorize(["admin", "premium"]), uploader.array("thumbnails"), productController.createProduct);
router.put("/:pid", authentication(), authorize(["admin", "premium"]), productController.updateProduct);
router.delete("/:pid", authentication(), authorize(["admin", "premium"]), productController.deleteProduct);

export default router;
