import { productRepository } from "../repositories/products.repository.js";
import { cartRepository } from "../repositories/cart.repository.js";

export default class ViewsService {
  async getProducts(limit, page, category, status, sortBy) {
    try {
      const products = await productRepository.getProducts(
        limit,
        page,
        category,
        status,
        sortBy
      );

      return products;
    } catch (error) {
      throw new Error("Failed to get products.");
    }
  }

  async getProductById(productId) {
    try {
      const product = await productRepository.getProductById(productId);
      return product;
    } catch (error) {
      throw new Error("Failed to get product by ID.");
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await cartRepository.getCartById(cartId);
      return cart;
    } catch (error) {
      throw new Error("Failed to get cart by ID.");
    }
  }
}
