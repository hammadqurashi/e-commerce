import { parse } from "search-params";
import productService from "../services/product-service.js";

const productController = {
  addProduct: async (req, res) => {
    const { data, msg, status, success } = await productService.create(
      req.body,
      req.files
    );

    return res.status(status).json({ success, msg, data });
  },

  updateProduct: async (req, res) => {
    const { productId } = req.params;

    const { data, msg, status, success } = await productService.update(
      productId,
      req.body,
      req.files
    );

    return res.status(status).json({ success, msg, data });
  },

  getAll: async (req, res) => {
    const { data, msg, status, success } = await productService.getAll();

    return res.status(status).json({ success, msg, data });
  },

  getPaginated: async (req, res) => {
    const { data, msg, status, success } = await productService.getPaginated(
      req.query
    );

    return res.status(status).json({ success, msg, data });
  },

  getBySlug: async (req, res) => {
    const { productSlug } = req.params;

    const { data, msg, status, success } = await productService.getBySlug(
      productSlug
    );

    return res.status(status).json({ success, msg, data });
  },

  delete: async (req, res) => {
    const { productId } = req.params;

    const { data, msg, status, success } = await productService.delete(
      productId
    );

    return res.status(status).json({ success, msg, data });
  },
};

export default productController;
