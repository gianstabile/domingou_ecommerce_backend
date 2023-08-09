import { logger } from "../utils/logger.js";
import CustomError from "../errors/customError.js";
import { errorsName, errorsCause, errorsMessage } from "../errors/errorDictionary.js";
import { productService } from "../services/products.service.js";
import { cartService } from "../services/cart.service.js";
import { orderService } from "../services/orders.service.js";

export async function getCarts(req, res, next) {
  try {
    const carts = await cartService.getCarts();

    if (!carts || carts.length === 0) {
      logger.error("Cart not found.");
      throw new CustomError({
        name: errorsName.CART_NOT_FOUND,
        message: errorsMessage.CART_NOT_FOUND,
        cause: errorsCause.CART_NOT_FOUND,
      });
    }

    logger.info("The carts were obtained successfully. ");

    res.send({ status: "Success", payload: carts });
  } catch (error) {
    logger.error("Error getting carts. ", error);
    next(error);
  }
}

export async function getCartById(req, res, next) {
  try {
    const { cid } = req.params;
    const cart = await cartService.getCartById(cid);

    if (!cart) {
      logger.error("Cart not found");

      throw new CustomError({
        name: errorsName.CART_NOT_FOUND,
        message: errorsMessage.CART_NOT_FOUND,
        cause: errorsCause.CART_NOT_FOUND,
      });
    }

    logger.info("Cart retrieved successfully");

    res.send({ status: "Success", payload: cart });
  } catch (error) {
    next(error);
  }
}

export async function getCartByUserId(req, res, next) {
  const { userId } = req.params;
  try {
    const cart = await cartService.getCartByUserId(userId);
    if (!cart) {
      logger.error("Cart not found");

      throw new CustomError({
        name: errorsName.CART_NOT_FOUND,
        message: errorsMessage.CART_NOT_FOUND,
        cause: errorsCause.CART_NOT_FOUND,
      });
    }
    res.status(200).json(cart);
  } catch (error) {
    logger.error("Error retrieving cart by user ID", error);

    next(
      new CustomError({
        name: errorsName.INTERNAL_SERVER_ERROR,
        message: errorsMessage.INTERNAL_SERVER_ERROR,
        cause: errorsCause.INTERNAL_SERVER_ERROR,
        originalError: error.message,
      })
    );
  }
}

export async function getProductInCart(req, res, next) {
  const { cid, pid } = req.params;
  try {
    const productInCart = await cartService.getProductInCart(cid, pid);

    if (!productInCart) {
      logger.error("Product not found in cart");

      throw new CustomError({
        name: errorsName.PRODUCT_NOT_FOUND,
        message: errorsMessage.PRODUCT_NOT_FOUND,
        cause: errorsCause.PRODUCT_NOT_FOUND,
      });
    }
    res.status(200).json(productInCart);
  } catch (error) {
    logger.error("Error retrieving product in cart", error);

    next(
      new CustomError({
        name: errorsName.PRODUCT_IN_CART,
        message: errorsMessage.PRODUCT_IN_CART,
        cause: errorsCause.PRODUCT_IN_CART,
        originalError: error.message,
      })
    );
  }
}

export async function createCart(req, res, next) {
  const { userId } = req.body;
  try {
    const cart = await cartService.createCart(userId);
    logger.info("Cart created successfully");

    return res.status(201).send({
      status: "Success",
      payload: cart,
      message: "Cart created successfully.",
    });
  } catch (error) {
    logger.error("Error creating cart", error);

    next(
      new CustomError({
        name: errorsName.CART_NOT_CREATED,
        message: errorsMessage.CART_NOT_CREATED,
        cause: errorsCause.CART_NOT_CREATED,
        originalError: error.message,
      })
    );
  }
}

export async function addCart(req, res, next) {
  const { cart } = req.body;
  try {
    const createdCart = await cartService.addCart(cart);
    logger.info("Cart added successfully");

    res.status(201).json(createdCart);
  } catch (error) {
    logger.error("Error adding cart", error);

    next(
      new CustomError({
        name: errorsName.INTERNAL_SERVER_ERROR,
        message: errorsMessage.INTERNAL_SERVER_ERROR,
        cause: errorsCause.INTERNAL_SERVER_ERROR,
        originalError: error.message,
      })
    );
  }
}

export async function addProductToCart(req, res, next) {
  const { cid, pid } = req.params;
  const quantity = req.body.qty;

  try {
    if (!cid) {
      logger.error("Invalid cart ID");
      throw new CustomError({
        name: errorsName.INVALID_CART_ID,
        message: errorsMessage.INVALID_CART_ID,
        cause: errorsCause.INVALID_CART_ID,
      });
    }

    if (!quantity || quantity <= 0) {
      logger.error("Invalid cart quantity");
      throw new CustomError({
        name: errorsName.INVALID_CART_QTY,
        message: errorsMessage.INVALID_CART_QTY,
        cause: errorsCause.INVALID_CART_QTY,
      });
    }

    const cart = await cartService.getCartById(cid);
    const product = await productService.getProductById(pid);

    if (!cart || !product) {
      logger.error("Cart or product not found");
      throw new CustomError({
        name: errorsName.CART_OR_PRODUCT_NOT_FOUND,
        message: errorsMessage.CART_OR_PRODUCT_NOT_FOUND,
        cause: errorsCause.CART_OR_PRODUCT_NOT_FOUND,
      });
    }

    const productInCart = await cartService.getProductInCart(cid, pid);
    if (productInCart) {
      const updatedQuantity = productInCart.quantity + quantity;
      await cartService.updateProductQuantity(cid, pid, updatedQuantity);
    } else {
      await cartService.addProductToCart(cid, pid, quantity);
    }

    const updatedCart = await cartService.getCartById(cid);
    const numProductsInCart = updatedCart.products.length;

    logger.info(`${quantity} product(s) added to cart`);

    return res.status(200).send({
      status: "Success",
      message: `${quantity} product(s) added to cart.`,
      cart: updatedCart,
      numProductsInCart: numProductsInCart,
    });
  } catch (error) {
    logger.error("Error adding product to cart", error);

    next(error);
  }
}

export async function updateCart(req, res, next) {
  try {
    const { cid } = req.params;
    const cartData = req.body;

    const cart = await cartService.getCartById(cid);
    if (!cart) {
      logger.error("Cart not found");

      throw new CustomError({
        name: errorsName.CART_NOT_FOUND,
        message: errorsMessage.CART_NOT_FOUND,
        cause: errorsCause.CART_NOT_FOUND,
      });
    }

    const updatedCart = await cartService.updateCart(cid, cartData);

    logger.info("Cart updated successfully");

    return res.send({ status: "Success", payload: updatedCart });
  } catch (error) {
    logger.error("Error updating cart", error);

    next(error);
  }
}

export async function updateProductQuantity(req, res, next) {
  try {
    const { cid, pid } = req.params;
    const quantity = req.body.qty;

    const cart = await cartService.getCartById(cid);
    const product = await productService.getProductById(pid);

    if (!cart || !product) {
      logger.error("Cart or product not found");

      throw new CustomError({
        name: errorsName.CART_OR_PRODUCT_NOT_FOUND,
        message: errorsMessage.CART_OR_PRODUCT_NOT_FOUND,
        cause: errorsCause.CART_OR_PRODUCT_NOT_FOUND,
      });
    }

    await cartService.updateProductQuantity(cid, pid, quantity);

    logger.info("Product quantity updated in cart");

    return res.send({
      status: "Success",
      message: "Product quantity updated in cart.",
    });
  } catch (error) {
    logger.error("Error updating product quantity in cart", error);

    next(error);
  }
}

export async function emptyCart(req, res, next) {
  try {
    const { cid } = req.params;
    const result = await cartService.emptyCart(cid);

    logger.info("Cart emptied successfully");

    return res.send({
      status: "Success",
      payload: result,
      response: "Cart emptied successfully",
    });
  } catch (error) {
    logger.error("Error emptying cart", customError);

    const customError = new CustomError({
      name: errorsName.INTERNAL_SERVER_ERROR,
      message: errorsMessage.INTERNAL_SERVER_ERROR,
      cause: errorsCause.INTERNAL_SERVER_ERROR,
      originalError: error.message,
    });
    next(customError);
  }
}

export async function deleteProductFromCart(req, res, next) {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const updatedCart = await cartService.deleteProductFromCart(cid, pid);

    logger.info("Product deleted successfully from cart");

    return res.send({
      status: "Success",
      payload: updatedCart,
      response: "Product deleted successfully from cart",
    });
  } catch (error) {
    const customError = new CustomError({
      name: errorsName.INTERNAL_SERVER_ERROR,
      message: errorsMessage.INTERNAL_SERVER_ERROR,
      cause: errorsCause.INTERNAL_SERVER_ERROR,
      originalError: error.message,
    });

    logger.error("Error deleting product from cart", customError);

    next(customError);
  }
}

export async function purchaseCart(req, res, next) {
  try {
    const cartId = req.params.cid;
    const cart = await cartService.getCartById(cartId);

    if (!cart || cart.products.length === 0) {
      throw new CustomError({
        name: errorsName.CART_NOT_FOUND,
        message: errorsMessage.CART_NOT_FOUND,
        cause: errorsCause.CART_NOT_FOUND,
      });
    }

    let message = "";
    const productsOutStock = [];
    for (const item of cart.products) {
      const product = await productService.getProductById(item.product._id);
      if (product.stock < item.quantity) {
        productsOutStock.push(item);
        message = "Some products are out of stock";
        logger.warning("Some products are out of stock");
      }
    }
    message = "Purchase completed";

    logger.info("Purchase completed");

    return res.json({
      status: "success",
      message,
      cart,
      productsOutStock,
    });
  } catch (error) {
    logger.error("Error purchasing cart", error);

    next(error);
  }
}
