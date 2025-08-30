import BaseService from "../base-service.js";
import Product from "../../models/product.js";
import cloudinary from "../../lib/cloudinary.js";

class ProductService extends BaseService {
  async uploadImages(images = []) {
    if (!images || images.length === 0) return [];

    const uploadPromises = images.map((img) =>
      cloudinary.uploader
        .upload_stream(img, { folder: "products" }, (err, result) => {
          if (err) throw err;

          return result.secure_url;
        })
        .end(img.buffer)
    );

    const imageURLsArr = await Promise.all(uploadPromises);
    return imageURLsArr;
  }

  async create(data, rawImages) {
    try {
      const {
        name,
        description,
        tags,
        price,
        colour,
        size,
        inStock,
        totalStock,
        soldCount,
      } = data;

      const images = this.uploadImages(rawImages);

      const product = new Product({
        name,
        description,
        tags,
        price,
        colour,
        size,
        images,
        inStock,
        totalStock,
        soldCount,
      });

      await product.save();

      return this.handleResponse(200, true, "Product created successfully.");
    } catch (err) {
      return this.handleError(err);
    }
  }

  async getAll() {
    try {
      const products = await Product.find({}).sort({ createdAt: -1 }).lean();

      return this.handleResponse(200, true, "Products.", products);
    } catch (err) {
      return this.handleError(err);
    }
  }

  async getById(id) {
    try {
      const product = await Product.findById(id).lean();

      if (!product) {
        return this.handleResponse(404, false, "Product not found.");
      }

      return this.handleResponse(
        200,
        true,
        "Product fetched successfully.",
        product
      );
    } catch (err) {
      return this.handleError(err);
    }
  }

  async update(id, data, rawImages) {
    try {
      const {
        name,
        description,
        tags,
        price,
        colour,
        size,
        inStock,
        totalStock,
        soldCount,
      } = data;

      let images;

      if (Array.isArray(rawImages) && rawImages.length > 0) {
        images = this.uploadImages(rawImages);
      }

      const product = await Product.findByIdAndUpdate(id, {
        name,
        description,
        tags,
        price,
        colour,
        size,
        images,
        inStock,
        totalStock,
        soldCount,
      });

      if (!product) {
        return this.handleResponse(404, false, "Product not found.");
      }

      return this.handleResponse(200, true, "Product updated successfully.");
    } catch (err) {
      return this.handleError(err);
    }
  }

  async delete(id) {
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return this.handleResponse(404, false, "Product not found.");
      }
      return this.handleResponse(
        200,
        true,
        "Product deleted successfully.",
        product
      );
    } catch (err) {
      return this.handleError(err);
    }
  }
}

const productService = new ProductService();
export default productService;
