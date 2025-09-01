import type { Product } from "@/features/shop/types";
import BaseService from "./base-service";
import { parse, build, omit, keep } from "search-params";

class ProductService extends BaseService {
  async create(payload: any) {
    const res = await this.httpService.post<any>("/products/", payload);
    return res;
  }

  async update(productId: string, payload: any) {
    const res = await this.httpService.put<any>(
      `/products/${productId}/`,
      payload
    );
    return res;
  }

  async getBySlug(productSlug: string) {
    const res = await this.httpService.get<Product | undefined>(
      `/products/${productSlug}`
    );

    if (res.success) {
      return res.data;
    }
  }

  async getAll() {
    const res = await this.httpService.get<Product[]>(`/products`);

    if (res.success) {
      return res.data;
    }

    return [];
  }

  async getPaginated(
    filters: { sizes: string[]; colors: string[] },
    page: number
  ) {
    const filterSearchParams = build(filters, { arrayFormat: "none" });

    const res = await this.httpService.get<{
      products: Product[];
      totalPages: number;
    }>(`/paginated-products?page=${page}&limit=12&${filterSearchParams}`);

    if (res.success) {
      return res.data;
    }

    return { products: [], totalPages: 0 };
  }

  async delete(productId: string) {
    const res = await this.httpService.delete<any>(`/products/${productId}`);

    return res;
  }
}

const productService = new ProductService();

export default productService;
