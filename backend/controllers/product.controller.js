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

  getById: async (req, res) => {
    const { productId } = req.params;

    const { data, msg, status, success } = await productService.getById(
      productId
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
