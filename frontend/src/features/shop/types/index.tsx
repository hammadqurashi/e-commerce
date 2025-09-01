export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  tags: string[];
  price: number;
  colour: string;
  size: "S" | "M" | "L" | "XL";
  images: string[];
  inStock: boolean;
  totalStock: number;
  soldCount: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  shipping: number;
}
