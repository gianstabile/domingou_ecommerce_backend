import { Router } from "express";
import { checkLogged, checkLogin, authorize } from "../middlewares/auth.js";
import ViewsController from "../controllers/views.controller.js";

const router = Router();
const viewsController = new ViewsController();

router.get("/", viewsController.getHome);
router.get("/products", viewsController.getProducts);
router.get("/product/:pid", viewsController.getProductById);
router.get("/cart", authorize(["user"]), viewsController.getCart);
router.get("/login", checkLogged, viewsController.getLogin);
router.get("/register", checkLogged, viewsController.getRegister);
router.get("/profile", checkLogin, viewsController.getProfile);
router.get("/admin/users", authorize(["admin"]), viewsController.getAllUsers);
router.get("/logout", viewsController.logout);
router.get("/restore-password", viewsController.restorePassword);
router.get("/current", viewsController.getCurrentUser);
router.get("/purchase", authorize(["user"]), viewsController.purchase);
router.get("/mockingproducts", viewsController.getMockingProducts);

export default router;
