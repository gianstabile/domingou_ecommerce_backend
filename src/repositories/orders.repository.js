import orderDAO from "../dao/db/order.dao.js";

class OrderRepository {
  constructor() {
    this.orderDAO = new orderDAO();
  }

  getOrders = async () => {
    try {
      let result = await this.orderDAO.getOrders();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  getOrderById = async (id) => {
    try {
      let result = await this.orderDAO.getOrderById(id);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  createOrder = async (order) => {
    try {
      let result = await this.orderDAO.createOrder(order);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  resolveOrder = async (id, order) => {
    try {
      let result = await this.orderDAO.resolveOrder(id, { $set: order });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const orderRepository = new OrderRepository();
