import { logger } from "../utils/logger.js";
import CustomError from "../errors/customError.js";
import { errorsName, errorsCause, errorsMessage } from "../errors/errorDictionary.js";
import { productService } from "../services/products.service.js";


export default class ProductController {
  getProducts = async (req, res, next) => {
    try {
      const { limit, page, category, status, sortBy } = req.query;
      const products = await productService.getProducts(limit, page, category, status, sortBy);

      logger.info("Products fetch successfully.");
      res.json(products);
    } catch (error) {
      next(
        new CustomError({
          name: errorsName.PRODUCTS_FETCH_FAILED,
          message: errorsMessage.PRODUCTS_FETCH_FAILED,
          cause: errorsCause.PRODUCTS_FETCH_FAILED,
          originalError: error.message,
        })
      );
      logger.error("Failed to fetch products");
    }
  };

  getProductById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      res.json(product);
    } catch (error) {
      next(
        new CustomError({
          name: errorsName.PRODUCT_FETCH_FAILED,
          message: errorsMessage.PRODUCT_FETCH_FAILED,
          cause: errorsCause.PRODUCT_FETCH_FAILED,
          originalError: error.message,
        })
      );
      logger.error("Failed to fetch product");
    }
  };

  createProduct = async (req, res, next) => {
    try {
      const product = req.body;
      const files = req.files;

      if (!files || files.length === 0) {
        CustomError.generateCustomError({
          name: errorsName.GENERAL_ERROR_NAME,
          message: errorsMessage.THUMBNAIL_NOT_UPLOADED_MESSAGE,
          cause: errorsCause.THUMBNAIL_NOT_UPLOADED_CAUSE,
        });
      }

      product.thumbnails = [];

      if (files && files.length > 0) {
        files.forEach((file) => {
          const imageUrl = `http://localhost:8080/uploads/products/${file.filename}`;
          product.thumbnails.push(imageUrl);
        });
      }

      const createdProduct = await productService.createProduct(product, req.session.user.id);

      logger.info("Product created successfully.");
      res.json(createdProduct);
    } catch (error) {
      logger.error("Failed to create product:", error);
      next(error);
    }
  };

  updateProduct = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const { body } = req;

      const updatedProduct = await productService.updateProduct(pid, body);
      if (!updatedProduct) {
        const customError = new CustomError({
          name: errorsName.PRODUCT_NOT_FOUND,
          message: errorsMessage.PRODUCT_NOT_FOUND,
          cause: errorsCause.PRODUCT_NOT_FOUND,
        });

        logger.error("Product not found", customError);
        res.status(404).json({ error: customError.message });
      } else {
        await productManager.updateProduct(pid, body);
      }

      logger.info("Product updated successfully");
      res.json(updatedProduct, req.session.user.id);
    } catch (error) {
      next(
        new CustomError({
          name: errorsName.PRODUCT_NOT_FOUND,
          message: errorsMessage.PRODUCT_NOT_FOUND,
          cause: errorsCause.PRODUCT_NOT_FOUND,
          originalError: error.message,
        })
      );
      logger.error("Failed to update product");
    }
  };

  deleteProduct = async (req, res, next) => {
    try {
      const { pid } = req.params;

      const result = await productService.deleteProduct(pid, req.session.user.id);

      res.json(result);
    } catch (error) {
      next(
        new CustomError({
          name: errorsName.INTERNAL_SERVER_ERROR,
          message: errorsMessage.INTERNAL_SERVER_ERROR,
          cause: errorsCause.INTERNAL_SERVER_ERROR,
          originalError: error.message,
        })
      );
      logger.error("Failed to delete product");
    }
  };
}
