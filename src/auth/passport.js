import { logger } from "../utils/logger.js";
import passport from "passport";
import local from "passport-local";
import config from "../config/config.js";
import userModel from "../dao/models/user.model.js";
import GitHubStrategy from "passport-github2";
import { createHash, isValidPassword } from "../utils/utils.js";
import { cartModel } from "../dao/models/cart.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import { registrationSuccessfulTemplate } from "../emails/registrationSuccessfulTemplate.js";

const LocalStrategy = local.Strategy;
const { github } = config;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, email, age, address } = req.body;

          const user = await userModel.findOne({ email });
          if (user) {
            logger.warning("Registration failed: User already exists");
            return done(null, false, { message: "Registration failed" });
          }

          // Nuevo carrito para el nuevo usuario
          const cart = await cartModel.create({});

          // Nuevo usuario
          const newUser = new userModel({
            first_name,
            last_name,
            email,
            age,
            address,
            role: "user",
            password: createHash(password),
            cart: cart._id,
          });

          const result = await newUser.save();

          // Enviar correo de registro exitoso
          const emailContent = registrationSuccessfulTemplate(newUser.first_name);
          await sendEmail(newUser.email, "Registration Successful", emailContent);
          logger.info("Mail sent to new user.");

          logger.info("User registered successfully.");
          return done(null, result);
        } catch (error) {
          logger.error("Error during user registration:", error);
          return done(error);
        }
      }
    )
  );

  //LOGIN
  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
      try {
        const user = await userModel.findOne({ email: username });

        if (!user) {
          logger.warning("User not found.");
          return done(null, false);
        }
        if (!isValidPassword(user, password)) {
          logger.warning("Invalid user or password.");
          return done(null, false);
        }

        logger.info("User found.");
        return done(null, user);
      } catch (error) {
        logger.error(error);
        return done(error);
      }
    })
  );

  //GITHUB
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: github.clientId,
        clientSecret: github.clientSecret,
        callbackURL: github.callbackUrl,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await userModel.findOne({ email: profile._json.email });

          if (!user) {
            const newUser = {
              first_name: profile.displayName,
              last_name: profile._json.last_name || "",
              email: profile._json.email,
              password: "",
              thumbnails: profile._json.avatar_url,
            };

            const result = await userModel.create(newUser);
            return done(null, result);
          }

          logger.info("User found.");
          return done(null, user);
        } catch (error) {
          logger.error(error);
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default initializePassport;
