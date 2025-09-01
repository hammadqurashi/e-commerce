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

const ProductDetail = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [warrantyOpen, setWarrantyOpen] = useState(false);
  const [maintenanceOpen, setMaintenanceOpen] = useState(false);

  const handleAddToCart = () => {
    if (product.size && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    dispatch(cartActions.addItem({ product, quantity, size: selectedSize }));
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
            <h1 className="font-heading text-3xl font-medium mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              <span className="font-body text-xl font-medium text-price">
                Rp {product.price.toLocaleString()}
              </span>
            </div>
          </div>

          {product.description && (
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Size Selection */}
          {product.size && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-body text-sm font-medium">
                  Size: {selectedSize || product.size}
                </label>
                <Button variant="link" className="font-body text-sm p-0 h-auto">
                  Size Guide
                </Button>
              </div>
              <Select
                value={selectedSize || product.size}
                onValueChange={setSelectedSize}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {["sm", "md", "lg", "xl"].map((size) => (
                    <SelectItem key={size} value={size}>
                      {size.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

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

          {/* Free Delivery Info */}
          <div className="p-4 bg-muted rounded-sm">
            <p className="font-body text-sm text-foreground">
              Free delivery for orders over 100€.
            </p>
          </div>

          {/* Product Details Accordion */}
          <div className="space-y-4">
            <Separator />

            <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-0 h-auto font-body text-sm font-medium"
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
                  <p>Premium quality materials</p>
                  <p>Handcrafted with attention to detail</p>
                  <p>Sustainable and ethically sourced</p>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Separator />

            <Collapsible open={warrantyOpen} onOpenChange={setWarrantyOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-0 h-auto font-body text-sm font-medium"
                >
                  Warranty
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      warrantyOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <div className="font-body text-sm text-muted-foreground space-y-2">
                  <p>2-year international warranty</p>
                  <p>Covers manufacturing defects</p>
                  <p>Easy return and exchange policy</p>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Separator />

            <Collapsible
              open={maintenanceOpen}
              onOpenChange={setMaintenanceOpen}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-0 h-auto font-body text-sm font-medium"
                >
                  Maintenance
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      maintenanceOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <div className="font-body text-sm text-muted-foreground space-y-2">
                  <p>Care instructions included</p>
                  <p>Professional cleaning services available</p>
                  <p>Lifetime maintenance support</p>
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
