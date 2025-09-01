import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import { Separator } from "@/shared/components/ui/separator";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/cart";
import type { Product } from "../types";
import { PRODUCT_COLORS, PRODUCT_SIZES } from "@/core/constants";
import { Badge } from "@/shared/components/ui/badge";

const ProductDetail = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleAddToCart = () => {
    if (product.size && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    if (product.colour && !selectedColor) {
      toast.error("Please select color");
      return;
    }

    dispatch(
      cartActions.addItem({
        product,
        quantity,
        size: selectedSize,
        color: selectedColor,
      })
    );
    dispatch(cartActions.setIsOpen(true));
    toast.success(`${product.name} has been added to your cart.`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Link
          to="/"
          className="font-body text-sm text-muted-foreground hover:text-foreground"
        >
          Home
        </Link>
        <span className="font-body text-sm text-muted-foreground">/</span>
        <span className="font-body text-sm text-foreground">
          {product.name}
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-sm bg-gray-50">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Thumbnail images would go here */}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="font-heading text-3xl font-medium mb-2">
                {product.name}
              </h1>
              <Badge variant={product.inStock ? "default" : "destructive"}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-body text-xl font-medium text-price">
                $ {product.price.toLocaleString()}
              </span>
            </div>
          </div>

          {product.description && (
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          )}

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-body text-sm font-medium">
                Size: {selectedSize}
              </label>
              <Button variant="link" className="font-body text-sm p-0 h-auto">
                Size Guide
              </Button>
            </div>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {PRODUCT_SIZES.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="font-body text-sm font-medium">Color</label>
            <div className="flex flex-wrap gap-3">
              {PRODUCT_COLORS.map((c) => (
                <label key={c.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="color"
                    value={c.value}
                    checked={selectedColor === c.value}
                    onChange={() => setSelectedColor(c.value)}
                    className="hidden"
                  />
                  <div
                    className={`h-8 w-8 rounded-full border-2 ${
                      selectedColor === c.value
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: c.value }}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-3">
            <label className="font-body text-sm font-medium">Quantity:</label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-body text-sm w-12 text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            className="w-full font-body bg-primary text-primary-foreground"
            onClick={handleAddToCart}
          >
            Add to Bag
          </Button>

          <div className="p-4 bg-muted rounded-sm">
            <p className="font-body text-sm text-foreground">
              Free delivery for orders over 100$.
            </p>
          </div>

          {/* Product Details Accordion */}
          <div className="space-y-4">
            <Separator />

            <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-2 h-auto font-body text-sm font-medium"
                >
                  Details
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      detailsOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <div className="font-body text-sm text-muted-foreground space-y-2">
                  {product.description}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
