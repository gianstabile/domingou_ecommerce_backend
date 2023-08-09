import { Router } from "express";
import passport from "passport";
import { register, failRegister, getLogin, processLogin, failLogin, logout, getProfile, getRestore, gitHub, gitHubCb, processGitHubCb } from "../controllers/sessions.controller.js";
import { checkLogged, checkLogin, authentication } from "../middlewares/auth.js";

const router = Router();

router.post("/register", checkLogged, register, processLogin);
router.get("/failregister", failRegister);
router.post("/login", passport.authenticate("login", { failureRedirect: "/api/sessions/failLogin" }), getLogin, processLogin);
router.get("/faillogin", failLogin);
router.get("/logout", logout);
router.get("/profile", checkLogin, getProfile);
router.put("/restore", getRestore);
router.get("/github", gitHub);
router.get("/githubcallback", gitHubCb, processGitHubCb);

export default router;
