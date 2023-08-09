import { Router } from "express";
import { getCarts, getCartById, createCart, addProductToCart, updateCart, updateProductQuantity, emptyCart, deleteProductFromCart, purchaseCart } from "../controllers/cart.controller.js";
import { authorize, authentication } from "../middlewares/auth.js";

const router = Router();

router.get("/", getCarts);
router.get("/:cid", getCartById);
router.post("/", createCart);
router.post("/:cid/products/:pid", authentication(), authorize(["user", "admin", "premium"]), addProductToCart);
router.put("/:cid", authentication(), authorize(["user", "admin", "premium"]), updateCart);
router.put("/:cid/products/:pid", authentication(), authorize(["user", "admin", "premium"]), updateProductQuantity);
router.delete("/:cid", authentication(), authorize(["user", "admin", "premium"]), emptyCart);
router.delete("/:cid/products/:pid", authentication(), authorize(["user", "admin", "premium"]), deleteProductFromCart);
router.post("/:cid/purchase", authentication(), authorize(["user", "admin", "premium"]), purchaseCart);

export default router;
