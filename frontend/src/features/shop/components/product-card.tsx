import { Link } from "react-router-dom";
import type { Product } from "../types";
import { Card, CardContent } from "@/shared/components/ui/card";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.slug}`}>
      <Card className="group cursor-pointer border-0 shadow-none bg-product-card hover:bg-product-card-hover transition-colors">
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden rounded-sm mb-3">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="space-y-1">
            <h3 className="font-body text-sm font-medium text-foreground leading-tight">
              {product.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="font-body text-sm font-medium text-price">
                $ {product.price.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
