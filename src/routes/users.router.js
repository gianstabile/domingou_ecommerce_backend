import { Router } from "express";
import { getAllUsers, deleteInactiveUsers, changeRole, uploadDocuments, getDocumentsByUser, deleteUserById, deleteDocumentsById, uploadProfileImage } from "../controllers/users.controller.js";
import { authorize, authentication } from "../middlewares/auth.js";
import { uploader } from "../utils/utils.js";

const router = Router();

router.get("/", authentication(), getAllUsers);
router.get("/:uid/documents", authentication(), getDocumentsByUser);
router.post("/:uid/documents", authentication(), uploader.array("document"), uploadDocuments);
router.post("/:uid/update", authentication(), uploader.single("profile"), uploadProfileImage);
router.post("/premium/:uid", authentication(), authorize(["admin"]), changeRole);
router.delete("/", authentication(), authorize(["admin"]), deleteInactiveUsers);
router.delete("/:uid", authentication(), authorize(["admin"]), deleteUserById);
router.delete("/:uid/documents/:did", authentication(), deleteDocumentsById);

export default router;
