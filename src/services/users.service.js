import usersRepository from "../repositories/users.repository.js";
import documentService from "./documents.service.js";
import { errorsCause, errorsMessage, errorsName } from "../errors/errorDictionary.js";
import { sendEmail } from "../utils/sendEmail.js";
import { accountDeletedTemplate } from "../emails/accountDeletedTemplate.js";
import { logger } from "../utils/logger.js";
import __dirname from "../utils/utils.js";

class UsersService {
  constructor() {
    this.usersRepository = new usersRepository();
  }

  getAllUsers = async () => {
    try {
      const users = await this.usersRepository.getAllUsers();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  };

  getUserById = async (id) => {
    try {
      const user = await this.usersRepository.getUserById(id);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  createUser = async (user) => {
    try {
      const createdUser = await this.usersRepository.createUser(user);
      return createdUser;
    } catch (error) {
      throw new Error(error);
    }
  };

  findInactiveUsers = async () => {
    try {
      const inactiveUsers = await this.usersRepository.findInactiveUsers();

      if (inactiveUsers.length > 0) {
        inactiveUsers.forEach(async (user) => {
          const { email, first_name, last_name } = user;
          const subject = "Account Deleted";
          const message = accountDeletedTemplate(first_name, last_name);

          await sendEmail(email, subject, message);
        });

        logger.info("Emails sent to suspended accounts.");
      }

      return inactiveUsers;
    } catch (error) {
      throw new Error("Failed to find inactive users.");
    }
  };

  deleteUserById = async (userId) => {
    try {
      await this.usersRepository.deleteUserById(userId);
    } catch (error) {
      throw new Error("Failed to delete user.");
    }
  };

  findById = async (id) => {
    try {
      const user = await this.usersRepository.findById(id);
      if (!user) {
        CustomError.generateCustomError({
          name: errorsName.USER_NOT_FOUND,
          message: errorsMessage.USER_NOT_FOUND,
          cause: errorsCause.USER_NOT_FOUND,
        });
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  findByEmail = async (email) => {
    try {
      const user = await this.usersRepository.findByEmail(email);

      return user;
    } catch (error) {
      throw new Error(`Error retrieving user by email: ${error.message}`);
    }
  };

  changeRole = async (userId, newRole) => {
    try {
      const user = await this.usersRepository.findById(userId);
      if (!user) {
        CustomError.generateCustomError({
          name: errorsName.USER_NOT_FOUND,
          message: errorsMessage.USER_NOT_FOUND,
          cause: errorsCause.USER_NOT_FOUND,
        });
      }

      // Verificar si el usuario tiene documentos cargados
      const documents = await documentService.findDocsById({ user: userId });
      if (documents.length === 0) {
        CustomError.generateCustomError({
          name: errorsName.DOCUMENTS_REQUIRED,
          message: errorsMessage.DOCUMENTS_REQUIRED,
          cause: errorsCause.DOCUMENTS_REQUIRED,
        });
      }

      user.hasUploadedDocuments = user.documents && user.documents.length > 0;

      // Cambiar el rol del usuario
      user.role = newRole;
      await this.usersRepository.changeRole(user._id, newRole);

      return {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        role: user.role,
        cart: user.cart,
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  async updateUserOrders(userId, order) {
    try {
      return await this.usersRepository.updateUserOrders(userId, order);
    } catch (error) {
      throw new Error(error);
    }
  }

  updateProfileImage = async (userId, profilePicture) => {
    try {
      const user = await this.usersRepository.findById(userId);
      if (!user) {
        throw new Error("User not found.");
      }

      if (!profilePicture) {
        throw new Error("No image was uploaded.");
      }

      const baseUrl = "http://localhost:8080";
      const profilePictureUrl = `${baseUrl}/uploads/profiles/${profilePicture}`;

      user.profilePicture = profilePictureUrl;

      await this.usersRepository.saveUser(user);

      return user;
    } catch (error) {
      throw new Error("Failed to upload profile image.");
    }
  };
}

export const usersService = new UsersService();
