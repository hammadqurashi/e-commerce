import { Schema, model } from "mongoose";
import Counter from "./counter";
import { createURLFromString } from "../utils";

const productSchema = new Schema(
  {
    name: { type: String, required: [true, "Product name is required."] },
    slug: {
      type: String,
      required: [true, "Product slug is required."],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required."],
    },
    tags: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      default: 1,
    },
    colour: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      enum: ["sm", "md", "lg", "xl"],
    },
    images: {
      type: [String],
      default: [],
    },
    inStock: {
      type: Boolean,
      default: false,
    },
    totalStock: {
      type: Number,
      default: 0,
    },
    soldCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", async function (next) {
  if (!this.isModified("name") && this.slug) return next();

  try {
    const newSlug = createURLFromString(this.name);

    const alreadyProduct = await this.constructor.findOne({
      slug: newSlug,
    });

    if (alreadyProduct) {
      const counter = await Counter.findOneAndUpdate(
        { key: "product" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.slug = `${newSlug}-${counter.seq}`;
    } else {
      this.slug = newSlug;
    }

    next();
  } catch (err) {
    next(err);
  }
});

const Product = model("Product", productSchema);
export default Product;
