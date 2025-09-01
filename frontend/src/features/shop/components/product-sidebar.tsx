import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import { PRODUCT_COLORS, PRODUCT_SIZES } from "@/core/constants";

const ProductSidebar = () => {
  const [openSections, setOpenSections] = useState({
    categories: true,
    brands: true,
    sizes: true,
    colors: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className="w-64 pr-8">
      <div className="space-y-6">
        {/* Sizes */}
        <Collapsible
          open={openSections.sizes}
          onOpenChange={() => toggleSection("sizes")}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between p-2 h-auto font-body text-sm font-medium"
            >
              Sizes
              {openSections.sizes ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <div className="grid grid-cols-3 gap-2">
              {PRODUCT_SIZES.map((size) => (
                <Button
                  key={size.value}
                  variant="outline"
                  size="sm"
                  className="h-8 font-body text-xs"
                >
                  {size.label}
                </Button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Colors */}
        <Collapsible
          open={openSections.colors}
          onOpenChange={() => toggleSection("colors")}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between p-2 h-auto font-body text-sm font-medium"
            >
              Colors
              {openSections.colors ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <div className="space-y-2">
              {PRODUCT_COLORS.map((color) => (
                <Button
                  key={color.value}
                  variant="ghost"
                  className="w-full justify-start p-2 h-auto font-body text-sm text-muted-foreground hover:text-foreground"
                >
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      color.value === "#ffffff" ? "border border-gray-300" : ""
                    }`}
                    style={{
                      backgroundColor: color.value,
                    }}
                  />
                  {color.label}
                </Button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </aside>
  );
};

export default ProductSidebar;
