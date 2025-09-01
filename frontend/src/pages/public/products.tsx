import ProductSidebar from "@/features/shop/components/product-sidebar";
import ProductCard from "@/features/shop/components/product-card";
import PageSpinner from "@/shared/components/ui/page-spinner";
import productService from "@/core/services/api/product-service";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
  const { data = [], isFetching } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => productService.getAll(),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <PageSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        <ProductSidebar />

        <main className="flex-1">
          <div className="mb-6">
            <h1 className="font-heading text-2xl font-medium mb-2">
              Explore Collection
            </h1>
            <p className="font-body text-sm text-muted-foreground">
              Explore The Various Collection of My Shop
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
