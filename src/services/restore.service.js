import { calculateExpirationDate, createHash, generateUniqueToken } from "../utils/utils.js";
import { restoreRepository } from "./../repositories/restore.repository.js";
import UserRepository from "./../repositories/users.repository.js";
import { sendEmail } from "../utils/sendEmail.js";
import { restorePasswordTemplate } from "../emails/restore.password.js";
import { comparePassword } from "../utils/utils.js";
import CustomError from "../errors/customError.js";
import { errorsCause, errorsMessage, errorsName } from "../errors/errorDictionary.js";
import { logger } from "../utils/logger.js";

const userRepository = new UserRepository();

class RestoreService {
  constructor() {
    this.repository = restoreRepository;
    this.userRepository = userRepository;
  }

  createRestore = async (email) => {
    try {
      const userExists = await this.userRepository.findByEmail(email);

      if (!userExists) {
        logger.error("User not found.");
        throw new CustomError({
          name: errorsName.GENERAL_ERROR_NAME,
          message: errorsMessage.USER_NOT_FOUND_MESSAGE,
          cause: errorsCause.USER_EMAIL_NOT_EXISTS_CAUSE,
        });
      }

      const token = generateUniqueToken();
      const expiredAt = calculateExpirationDate();

      const restoreData = {
        email: userExists.email,
        token,
        created_at: new Date(),
        expired_at: expiredAt,
      };

      const restore = await this.repository.create(restoreData);

      if (!restore) {
        logger.error("Failed to create restore.");
        throw new CustomError({
          name: errorsName.GENERAL_ERROR_NAME,
          message: errorsMessage.RESTORE_NOT_CREATED_MESSAGE,
          cause: errorsCause.RESTORE_NOT_CREATED_CAUSE,
        });
      } else {
        const subject = "Password reset";
        const message = restorePasswordTemplate(token);

        await sendEmail(email, subject, message);
      }
      return restore;
    } catch (error) {
      logger.error("An error occurred during restore creation.", error);
      throw new Error(error);
    }
  };

  restorePassword = async (token) => {
    try {
      const restore = await this.repository.findByToken(token);
      if (!restore) {
        logger.info("Password restore not found for token:", token);
        return null;
      }

      const actualDatetime = new Date();
      const expirationDatetime = new Date(restore.expired_at);

      if (actualDatetime.getTime() > expirationDatetime.getTime()) {
        logger.info("Password restore has expired for token:", token);
        return null;
      }

      return restore;
    } catch (error) {
      logger.error("An error occurred during password restore:", error);
      throw new Error(error);
    }
  };

  changePassword = async (token, newPassword) => {
    try {
      const restore = await this.repository.findByToken(token);
      if (!restore) {
        logger.error("Password restore not found for token:", token);
        throw new CustomError({
          name: errorsName.GENERAL_ERROR_NAME,
          message: errorsMessage.RESTORE_NOT_FOUND_MESSAGE,
          cause: errorsCause.RESTORE_NOT_FOUND_CAUSE,
        });
      }

      const user = await this.userRepository.findByEmail(restore.email);
      if (!user) {
        logger.error("User not found for restore email:", restore.email);
        throw new CustomError({
          name: errorsName.GENERAL_ERROR_NAME,
          message: errorsMessage.USER_NOT_FOUND_MESSAGE,
          cause: errorsCause.USER_EMAIL_NOT_EXISTS_CAUSE,
        });
      }

      await this.repository.setRestored(restore._id);

      const currentPassword = user.password;
      if (comparePassword(newPassword, currentPassword)) {
        logger.error("Current password already used. Change it.");
        new CustomError({
          name: errorsName.GENERAL_ERROR_NAME,
          message: errorsMessage.INVALID_CURRENT_PASSWORD_MESSAGE,
          cause: errorsCause.INVALID_CURRENT_PASSWORD_CAUSE,
        });
        return;
      } else {
        user.password = createHash(newPassword);
        logger.info("Password changed successfully.");
        return await this.userRepository.saveUser(user);
      }
    } catch (error) {
      logger.error("An error occurred during password change:", error);
      throw new Error(error);
    }
  };
}

export const restoreService = new RestoreService();
