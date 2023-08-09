import OrderModel from "../models/order.model.js";

export default class OrderDAO {
  constructor() {
    this.orderModel = OrderModel;
  }
  getOrders = async () => {
    try {
      let result = await this.orderModel.find();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  getOrderById = async (orderId) => {
    try {
      const order = await this.orderModel.findById(orderId);
      return order;
    } catch (error) {
      throw new Error(error);
    }
  };

  createOrder = async (order) => {
    try {
      const createdOrder = await this.orderModel.create(order);
      return createdOrder;
    } catch (error) {
      throw new Error(error);
    }
  };

  resolveOrder = async (id, order) => {
    try {
      let result = await this.orderModel.updateOne({ _id: id }, { $set: order });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
}
