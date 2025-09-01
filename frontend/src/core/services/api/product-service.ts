import type { Product } from "@/features/shop/types";
import BaseService from "./base-service";

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

  async getById(productId: string) {
    const res = await this.httpService.get<Product | undefined>(
      `/products/${productId}`
    );

    if (res.success) {
      return res.data;
    }
  }

  async getAll() {
    const res = await this.httpService.get<Product[]>("/products");

    if (res.success) {
      return res.data;
    }

    return [];
  }

  async delete(productId: string) {
    const res = await this.httpService.delete<any>(`/products/${productId}`);

    return res;
  }
}

const productService = new ProductService();

export default productService;
