import { Router } from "express";
import { changePassword, restore } from "../controllers/restore.controller.js";

const router = Router();

router.post("/", restore);
router.post("/password", changePassword);

export default router;
