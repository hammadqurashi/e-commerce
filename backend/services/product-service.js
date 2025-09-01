import BaseService from "./base-service.js";
import Product from "../models/product.js";
import cloudinary from "../lib/cloudinary.js";
import { createReadStream } from "fs";

class ProductService extends BaseService {
  async uploadImages(images = []) {
    if (!images || images.length === 0) return [];

    const uploadPromises = images.map((img) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (err, result) => {
            if (err) return reject(err);
            resolve(result.secure_url);
          }
        );

        stream.end(img.buffer);
      });
    });

    return Promise.all(uploadPromises);
  }

  async create(data, rawImages) {
    try {
      const { name, description, tags, price, colour, size, totalStock } = data;

      const images = await this.uploadImages(rawImages);

      const product = new Product({
        name,
        description,
        tags,
        price,
        colour,
        size,
        images,
        inStock: Number(totalStock) > 0,
        totalStock,
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

  async getPaginated(searchParams) {
    try {
      const {
        page = 1,
        limit = 12,
        sizes = [],
        colors = [],
      } = searchParams || {};

      const filterQuery = {};

      if (sizes.length > 0) {
        filterQuery.size = {
          $in: Array.isArray(sizes) ? [...sizes] : [sizes],
        };
      }

      if (colors.length > 0) {
        filterQuery.colour = {
          $in: Array.isArray(colors) ? [...colors] : [colors],
        };
      }

      const totalProducts = await Product.countDocuments(filterQuery);

      const products = await Product.find(filterQuery)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean();

      const totalPages = Math.ceil(totalProducts / limit);

      return this.handleResponse(200, true, "Products.", {
        products,
        totalPages,
      });
    } catch (err) {
      return this.handleError(err);
    }
  }

  async getBySlug(slug) {
    try {
      const product = await Product.findOne({ slug }).lean();

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
      const { name, description, tags, price, colour, size, totalStock } = data;

      let images;

      if (Array.isArray(rawImages) && rawImages.length > 0) {
        images = await this.uploadImages(rawImages);
      }

      const product = await Product.findByIdAndUpdate(id, {
        name,
        description,
        tags,
        price,
        colour,
        size,
        images,
        inStock: Number(totalStock) > 0,
        totalStock,
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
