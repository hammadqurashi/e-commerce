import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { PRODUCT_COLORS, PRODUCT_SIZES } from "@/core/constants";
import { buildFormData } from "@/core/lib/utils";
import productService from "@/core/services/api/product-service";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "@/features/shop/types";
import { toast } from "sonner";

const DEFAULT_VALUES = {
  name: "",
  description: "",
  price: 0,
  colour: "",
  totalStock: 0,
  inStock: false,
  size: "S",
};

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  colour: z.enum(PRODUCT_COLORS.map(({ value }) => value)).optional(),
  size: z.enum(PRODUCT_SIZES.map(({ value }) => value)).optional(),
  totalStock: z.number().min(0, "Stock cannot be negative"),
  inStock: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

const useProductForm = ({ defaultValues }: { defaultValues?: Product }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const { id: productId } = useParams();

  const isUpdate = !!productId;

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: isUpdate ? defaultValues : DEFAULT_VALUES,
  });

  const navigate = useNavigate();

  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData();

    buildFormData(formData, { ...data, tags, images });

    let res;

    if (isUpdate) {
      res = await productService.update(productId, formData);
    } else {
      res = await productService.create(formData);
    }

    if (res.success) {
      toast.success(res.message);

      if (!isUpdate) {
        navigate("/admin/products");
      }

      return;
    }

    toast.error(
      res.message ||
        `Error ${
          isUpdate ? "updating" : "creating"
        } product, please try again later.`
    );
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagIndex: number) => {
    console.log(tagIndex);
    setTags((prev) => prev.filter((_, i) => i !== tagIndex));
  };

  return {
    form,
    onSubmit,
    addTag,
    removeTag,
    images,
    setImages,
    newTag,
    setNewTag,
    tags,
  };
};

export default useProductForm;
