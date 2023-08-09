import userModel from "../models/user.model.js";

export default class UsersDao {
  constructor() {}

  getUserById = async (id) => {
    try {
      const user = await userModel.findOne({ _id: id }).populate("orders");
      return user;
    } catch (error) {
      throw new Error("Error retrieving user by ID: " + error.message);
    }
  };

  getAllUsers = async () => {
    return await userModel.find({}, "first_name last_name email role profilePicture");
  };

  createUser = async (user) => {
    try {
      const result = await userModel.create(user);
      return result;
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  };

  saveUser = async (user) => {
    try {
      return await userModel.findOneAndUpdate({ _id: user._id }, { $set: user });
    } catch (error) {
      throw new Error("Error save user: " + error);
    }
  };

  findByCartId = async (cartId) => {
    try {
      const user = await userModel.findOne({ cart: cartId });
      return user;
    } catch (error) {
      throw new Error("Error finding user by cart ID: " + error.message);
    }
  };

  findByEmail = async (email) => {
    try {
      return await userModel.findOne({ email });
    } catch (error) {
      throw new Error("Failed to get user by email.");
    }
  };

  findById = async (id) => {
    try {
      return await userModel.findById({ _id: id });
    } catch (error) {
      throw new Error(error);
    }
  };

  findInactiveUsers = async () => {
    try {
      //calcular los 2 días sin conexión
      const lastConnectionDate = new Date();
      lastConnectionDate.setDate(lastConnectionDate.getDate() - 2);

      //filtrar por tiempo sin conexión, o por valor null
      return await userModel.find({
        $or: [{ last_connection: { $lt: lastConnectionDate } }, { last_connection: { $exists: false } }],
      });
    } catch (error) {
      throw new Error("Failed to find inactive users.");
    }
  };

  deleteUserById = async (userId) => {
    try {
      return await userModel.findByIdAndDelete(userId);
    } catch (error) {
      throw new Error("Failed to delete user.");
    }
  };

  changeRole = async (userId, newRole) => {
    try {
      return await userModel.findOneAndUpdate({ _id: userId }, { role: newRole }, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  };

  updateUserOrders = async (userId, orderId) => {
    try {
      await userModel.updateOne({ _id: userId }, { $push: { orders: orderId } });
    } catch (error) {
      throw new Error(error);
    }
  };

  updateDocuments = async (userId, createdDocument) => {
    try {
      await userModel.updateOne({ _id: userId }, { $push: { documents: createdDocument } });
    } catch (error) {
      throw new Error("Failed to update documents.");
    }
  };

  updateLastConnection = async (userId, lastConnection) => {
    try {
      await userModel.findByIdAndUpdate(userId, { last_connection: lastConnection });
    } catch (error) {
      throw new Error(error);
    }
  };

  updateHasUploadedDocuments = async (userId, value) => {
    try {
      await userModel.findByIdAndUpdate(userId, { hasUploadedDocuments: value });
    } catch (error) {
      throw new Error("Failed to update hasUploadedDocuments.");
    }
  };
}
