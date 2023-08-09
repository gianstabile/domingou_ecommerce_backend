import { cartModel } from "../dao/models/cart.model.js";

class CartRepository {
  async getCarts() {
    try {
      return await cartModel.find();
    } catch (error) {
      throw new Error(`Failed to get carts: ${error.message}`);
    }
  }

  async getCartById(cid) {
    try {
      const cart = await cartModel.findOne({ _id: cid }).populate("products.product").lean();
      if (cart) {
        return cart;
      } else {
        throw new Error("Cart not found.");
      }
    } catch (error) {
      throw new Error(`Internal server error. Exception: ${error}`);
    }
  }

  async getCartByUserId(userId) {
    try {
      const cart = await cartModel.findOne({ user: userId }).populate("products.product");
      return cart;
    } catch (error) {
      throw new Error("Error getting cart by user ID.");
    }
  }

  async getProductInCart(cid, pid) {
    try {
      const cart = await cartModel.findOne({ _id: cid });
      if (!cart) {
        throw new Error(`Cart not found with ID ${cid}`);
      }
      const productInCart = cart.products.find((product) => {
        return product.product && product.product.toString() === pid;
      });
      return productInCart || null;
    } catch (error) {
      throw error;
    }
  }

  async createCart(userId) {
    try {
      const cart = new cartModel({
        user: userId,
      });
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Internal server error. Exception: ${error}`);
    }
  }

  async addCart(cart) {
    try {
      const createdCart = await cartModel.create(cart);
      return createdCart;
    } catch (error) {
      throw new Error(`Failed to add cart: ${error.message}`);
    }
  }

  async addProductToCart(cid, pid, quantity) {
    return await cartModel.findByIdAndUpdate(
      cid,
      {
        $push: {
          products: { product: pid, quantity: quantity },
        },
      },
      { new: true }
    );
  }

  async updateCart(cartId, products) {
    try {
      const updatedCart = await cartModel.findByIdAndUpdate(cartId, { $set: { products: products } }, { new: true });
      return updatedCart;
    } catch (error) {
      throw new Error(`Failed to update cart: ${error.message}`);
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    try {
      const cart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $set: { "products.$.quantity": quantity } }, { new: true });
      if (!cart) {
        throw new Error(`Cart not found with ID ${cid}`);
      }
      return cart;
    } catch (error) {
      throw new Error(`Failed to update product quantity in cart: ${error.message}`);
    }
  }

  async emptyCart(cid) {
    return await cartModel.findByIdAndUpdate(cid, { products: [] }, { new: true });
  }

  async deleteProductFromCart(cid, pid) {
    try {
      const cart = await cartModel.findById(cid);
      if (!cart) {
        throw new Error(`Cart not found with ID ${cid}`);
      }

      cart.products = cart.products.filter((product) => product.product._id.toString() !== pid);

      await cart.save();

      return cart;
    } catch (error) {
      throw new Error(`Failed to delete product from cart: ${error.message}`);
    }
  }
}

export const cartRepository = new CartRepository();
