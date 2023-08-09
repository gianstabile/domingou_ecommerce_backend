import { restoreService } from "./../services/restore.service.js";
import { logger } from "../utils/logger.js";
import CustomError from "../errors/customError.js";
import { errorsName, errorsCause, errorsMessage } from "../errors/errorDictionary.js";

export async function restore(req, res, next) {
  try {
    const { email } = req.body;

    const result = await restoreService.createRestore(email);

    logger.info("Password reset email sent successfully.");

    res.status(200).send(result);
  } catch (error) {
    logger.error("Failed to send the password reset email.", error);
    next(
      new CustomError.createCustomError({
        name: errorsName.RESTORE_ERROR_NAME,
        message: errorsMessage.RESTORE_NOT_CREATED_MESSAGE,
        cause: errorsCause.RESTORE_NOT_CREATED_CAUSE,
      })
    );
  }
}

export async function changePassword(req, res, next) {
  try {
    const { newPassword } = req.body;
    const { token } = req.query;
    const result = await restoreService.changePassword(token, newPassword);

    res.status(200).send(result);
  } catch (error) {
    logger.error("Failed to change password.", error);
    next(
      new CustomError({
        name: errorsName.CHANGE_PASSWORD_ERROR_NAME,
        message: errorsMessage.CHANGE_PASSWORD_ERROR_MESSAGE,
        cause: error,
      })
    );
  }
}
