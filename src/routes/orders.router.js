import { Router } from "express";
import { getOrders, getOrderById, createOrder, resolveOrder, paymentIntents } from "../controllers/orders.controller.js";

const router = Router();

router.get("/", getOrders);
router.post("/", createOrder);
router.post("/:oid/payment", paymentIntents);
router.get("/:oid", getOrderById);
router.put("/:oid/resolve", resolveOrder);

export default router;
