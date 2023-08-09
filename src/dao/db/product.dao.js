import { productModel } from "../models/products.model.js";

export default class ProductManager {
  constructor() {}

  getProducts = async (limit, page, category, status, sortBy) => {
    try {
      const query = {};
  
      // Filtro category
      if (category) {
        query.category = category;
      }
  
      // Filtro status
      if (status) {
        query.status = status;
      }
  
      const products = await productModel.paginate({},{limit, page, category, status, sortBy, lean: true });
        
      return products;
    } catch (error) {
      throw new Error(`Failed to fetch products from the database. Error: ${error.message}`);
    }
  };
  
  getProductsById = async (id) => {
    try {
      const product = await productModel.findById(id).lean();
      return product;
    } catch (error) {
      throw new Error(`Error getting product by ID: ${error}`);
    }
  };

  createProduct = async (product) => {
    try {
      const createdProduct = await productModel.create(product);
      return createdProduct;
    } catch (error) {
      throw new Error(`Error creating product: ${error}`);
    }
  };

  updateProduct = async (pid, body) => {
    try {
      const updatedProduct = await productModel.updateOne({ _id: pid }, body);
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error updating product: ${error}`);
    }
  };

  deleteProduct = async (pid) => {
    try {
      const deletedProduct = await productModel.deleteOne({ _id: pid });
      return deletedProduct;
    } catch (error) {
      throw new Error(`Error deleting product: ${error}`);
    }
  };
}
