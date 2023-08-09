import { logger } from "../utils/logger.js";

function checkLogin(req, res, next) {
  if (!req.session.user) {
    logger.error("User not logged in.");
    return res.redirect("/login");
  }
  next();
}

function checkLogged(req, res, next) {
  if (req.session.user) {
    return res.redirect("/products");
  }
  next();
}

function checkSession(req, res, next) {
  if (req.session.user) return res.redirect("/");
  next();
}

function isAdmin(req, res, next) {
  if (req.session?.user) {
    if (req.session.user.email === "adminCoder@coder.com" && req.session.user.role === "admin") {
      return next();
    } else {
      logger.error("User not authorized.");
      return res.status(401).send({ status: "error", message: "User not authorized" });
    }
  } else {
    return res.redirect("/login");
  }
}

function authorize(role) {
  return (req, res, next) => {
    const currentUser = req.session.user;
    const hasPermission = role.some((role) => currentUser.role === role);
    if (!hasPermission) {
      logger.error("User not authorized to access.");
      return res.status(403).json({ error: "Unauthorized", message: "You are not authorized to access this resource." });
    }
    next();
  };
}

function authentication(redirect = false) {
  return (req, res, next) => {
    if (redirect && req.session.user === undefined) return res.redirect("/login");
    if (req.session.user === undefined) return res.status(401).send("Unauthenticated");

    next();
  };
}

export { checkLogged, checkLogin, checkSession, isAdmin, authorize, authentication };
