import { useState, memo, useMemo } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet";
import { PRODUCT_COLORS, PRODUCT_SIZES } from "@/core/constants";
import { useIsMobile } from "@/shared/hooks/use-mobile";

interface ProductSidebarProps {
  selectedFilters: { sizes: string[]; colors: string[] };
  onFilterChange: (key: "sizes" | "colors", value: string) => void;
  isOpenMobileFilters: boolean;
  setIsOpenMobileFilters: (value: boolean) => void;
}

const ProductSidebar = ({
  selectedFilters,
  onFilterChange,
  isOpenMobileFilters,
  setIsOpenMobileFilters,
}: ProductSidebarProps) => {
  const isMobile = useIsMobile();

  const [openSections, setOpenSections] = useState({
    sizes: true,
    colors: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const sizeButtons = useMemo(
    () =>
      PRODUCT_SIZES.map((size) => {
        const isActive = selectedFilters.sizes.includes(size.value);
        return (
          <Button
            key={size.value}
            variant={isActive ? "default" : "outline"}
            size="sm"
            className="h-8 font-body text-xs"
            onClick={() => onFilterChange("sizes", size.value)}
          >
            {size.label}
          </Button>
        );
      }),
    [selectedFilters.sizes, onFilterChange]
  );

  const colorButtons = useMemo(
    () =>
      PRODUCT_COLORS.map((color) => {
        const isActive = selectedFilters.colors.includes(color.value);
        return (
          <Button
            key={color.value}
            variant="ghost"
            className={`w-full justify-start p-2 h-auto font-body text-sm ${
              isActive
                ? "text-foreground font-semibold bg-gray-100"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => onFilterChange("colors", color.value)}
          >
            <div
              className={`w-4 h-4 rounded-full mr-2 ${
                color.value === "#ffffff" ? "border border-gray-300" : ""
              }`}
              style={{ backgroundColor: color.value }}
            />
            {color.label}
          </Button>
        );
      }),
    [selectedFilters.colors, onFilterChange]
  );

  const SidebarContent = (
    <div className="flex flex-col gap-6">
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
          <div className="grid grid-cols-3 gap-2">{sizeButtons}</div>
        </CollapsibleContent>
      </Collapsible>

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
          <div className="space-y-2">{colorButtons}</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );

  if (isMobile) {
    return (
      <div>
        <Sheet open={isOpenMobileFilters} onOpenChange={setIsOpenMobileFilters}>
          <SheetContent side="left" className="w-72 gap-0">
            <SheetHeader className="px-4 py-2">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div>{SidebarContent}</div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return <aside className="w-64 pr-8">{SidebarContent}</aside>;
};

export default memo(ProductSidebar);
