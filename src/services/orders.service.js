import { orderRepository } from "../repositories/orders.repository.js";
import { cartRepository } from "../repositories/cart.repository.js";
import UsersRepository from "../repositories/users.repository.js";
import { productRepository } from "../repositories/products.repository.js";
import { v4 as uuid4 } from "uuid";

const userRepository = new UsersRepository();

class OrderService {
  constructor() {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
    this.cartRepository = cartRepository;
    this.userRepository = userRepository;
  }

  async getOrders() {
    try {
      return await this.orderRepository.getOrders();
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch orders.");
    }
  }

  async getOrderById(id) {
    try {
      return await this.orderRepository.getOrderById(id);
    } catch (error) {
      console.error(error);
      throw new Error("Error getting order by ID.");
    }
  }

  async createOrder(cartId) {
    try {
      const cart = await cartRepository.getCartById(cartId);
      if (!cart) {
        throw new Error("Cart does not exist.");
      }

      const user = await userRepository.findByCartId(cartId);
      if (!user) {
        throw new Error("User does not exist.");
      }

      let amount = 0;
      const code = uuid4();
      const purchase_datetime = new Date();
      let successProducts = [];
      let productsOutStock = [];

      for (const item of cart.products) {
        const product = await productRepository.getProductById(item.product._id);
        const quantity = item.quantity;
        const price = item.product.price;

        if (product.stock < quantity) {
          productsOutStock.push({
            product: item.product,
            quantity: quantity,
          });
        } else {
          product.stock -= quantity;
          successProducts.push({
            product: product,
            quantity: quantity,
          });
          await productRepository.updateProduct(product._id, product);
          amount += price * quantity;
        }
      }

      const purchaser = user.email;
      const userId = user._id;

      let orderSuccess = true;

      if (productsOutStock.length > 0) {
        orderSuccess = false;
      }

      const order = {
        code: code,
        purchase_datetime,
        successProducts,
        productsOutStock,
        amount,
        purchaser,
      };

      const newOrder = await orderRepository.createOrder(order);
      const orderId = newOrder._id;

      await userRepository.updateUserOrders(userId, orderId);

      if (orderSuccess) {
        const productsOutStockIds = productsOutStock.map((item) => item.product._id.toString());
        const updatedProducts = cart.products.filter((item) => !productsOutStockIds.includes(item.product._id.toString()));
        cart.products = updatedProducts;
        await cartRepository.emptyCart(cart);
      } else {
        await cartRepository.updateCart(cart, productsOutStock);
      }
      return {
        order: newOrder,
        successProducts: successProducts,
        productsOutStock: productsOutStock,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error creating order.");
    }
  }

  async resolveOrder(id, updatedOrder) {
    try {
      return await this.orderRepository.resolveOrder(id, updatedOrder);
    } catch (error) {
      console.error(error);
      throw new Error("Error resolving order.");
    }
  }
}

export const orderService = new OrderService();
