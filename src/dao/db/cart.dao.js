import { cartModel } from "../models/cart.model.js";

export default class CartManager {
  constructor() {}

  getCarts = async () => {
    try {
      return await cartModel.find();
    } catch (error) {
      return { error: error.message };
    }
  };

  getCartsById = async (id) => {
    try {
      const cart = await cartModel.findOne({ _id: id }).populate("products.product").lean();
      return cart;
    } catch (error) {
      throw new Error(`Internal server error. Exception: ${error}`);
    }
  };

  getCartByUserId = async (userId) => {
    try {
      const cart = await cartModel.findOne({ user: userId }).populate("products.product");
      return cart;
    } catch (error) {
      return {
        status: "error",
        message: "Error getting cart by user ID.",
        error: error.message,
      };
    }
  };

  getProductInCart = async (cartId, productId) => {
    try {
      const cart = await cartModel.findOne({ _id: cartId });
      if (!cart) {
        throw new Error(`Cart not found with ID ${cartId}`);
      }
      const productInCart = cart.products.find((product) => product.product.toString() === productId);
      return productInCart || null; // Devuelve null si no se encuentra el producto
    } catch (error) {
      throw new Error(`Internal server error. Exception: ${error}`);
    }
  };

  createCart = async (userId) => {
    try {
      const cart = new cartModel({
        user: userId,
      });
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Internal server error. Exception: ${error}`);
    }
  };

  addCart = async (cart) => {
    try {
      const createdCart = await cartModel.create(cart);
      return createdCart;
    } catch (error) {
      throw new Error(error);
    }
  };

  addProductToCart = async (cartId, productId, quantity) => {
    try {
      const updatedCart = await cartModel.updateOne({ _id: cartId }, { $push: { products: [{ product: productId, quantity }] } });

      return updatedCart;
    } catch (error) {
      throw new Error(error);
    }
  };

  updateCart = async (cartId, body) => {
    try {
      const updatedCart = await cartModel.updateOne({ _id: cartId }, { $set: { products: body.products } });
      return updatedCart;
    } catch (error) {
      throw new Error(`Internal server error. Exception: ${error}`);
    }
  };

  updateProductQuantity = async (cartId, productId, quantity) => {
    try {
      const updatedCart = await cartModel.updateOne({ _id: cartId, "products.product": productId }, { $set: { "products.$.quantity": quantity } });
      return updatedCart;
    } catch (error) {
      throw new Error(`Failed to update product quantity in cart: ${error.message}`);
    }
  };

  emptyCart = async (cartId) => {
    // Corrección en el parámetro
    try {
      const updatedCart = await cartModel.updateOne(
        { _id: cartId },
        { $set: { products: [] } } // Establece el arreglo de productos como vacío
      );

      return updatedCart;
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteProductFromCart = async (cartId, productId) => {
    try {
      const cart = await cartModel.findById(cartId); // Obtén el carrito por su ID
      if (!cart) {
        throw new Error(`Cart not found with ID ${cartId}`);
      }

      // Busca el índice del producto en el arreglo de productos del carrito
      const productIndex = cart.products.findIndex((product) => product.product.toString() === productId);

      if (productIndex === -1) {
        throw new Error(`Product not found in cart with ID ${cartId}`);
      }

      // Reduce la cantidad del producto en 1
      const product = cart.products[productIndex];
      product.quantity -= 1;

      // Si la cantidad del producto es 0, elimina el producto del arreglo de productos del carrito
      if (product.quantity === 0) {
        cart.products.splice(productIndex, 1);
      }

      await cart.save(); // Guarda el carrito actualizado

      return cart;
    } catch (error) {
      throw new Error(error);
    }
  };
}
