import ProductSidebar from "@/features/shop/components/product-sidebar";
import ProductCard from "@/features/shop/components/product-card";
import PageSpinner from "@/shared/components/ui/page-spinner";
import productService from "@/core/services/api/product-service";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import ProductsPagination from "@/features/shop/components/products-pagination";

export default function Products() {
  const [filters, setFilters] = useState<{ sizes: string[]; colors: string[] }>(
    { sizes: [], colors: [] }
  );

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching } = useQuery({
    queryKey: ["all-products", filters, currentPage],
    queryFn: () => productService.getPaginated(filters, currentPage),
    refetchOnWindowFocus: false,
  });

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = useCallback(
    (key: "sizes" | "colors", value: string) => {
      setFilters((prev) => {
        const alreadySelected = prev[key].includes(value);
        return {
          ...prev,
          [key]: alreadySelected
            ? prev[key].filter((v) => v !== value)
            : [...prev[key], value],
        };
      });
    },
    []
  );

  if (isFetching) {
    return <PageSpinner />;
  }

  const { products = [], totalPages = 0 } = data || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        <ProductSidebar
          onFilterChange={handleFilterChange}
          selectedFilters={filters}
        />

        <main className="flex-1">
          <div className="mb-6">
            <h1 className="font-heading text-2xl font-medium mb-2">
              Explore Collection
            </h1>
            <p className="font-body text-sm text-muted-foreground">
              Explore The Various Collection of My Shop
            </p>
          </div>

          {products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px]">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
          {products.length <= 0 && (
            <div className="container mx-auto px-4 py-8 min-h-[400px]">
              <div className="text-center py-16">
                <h1 className="font-heading text-2xl font-medium mb-4">
                  No, Products Found
                </h1>
                <p className="font-body text-muted-foreground mb-6">
                  Adjust your filters or come back again later.
                </p>
              </div>
            </div>
          )}

          {products.length > 0 && (
            <div className="my-12">
              <ProductsPagination
                currentPage={currentPage}
                onPageChange={handlePageChange}
                totalPages={totalPages}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
