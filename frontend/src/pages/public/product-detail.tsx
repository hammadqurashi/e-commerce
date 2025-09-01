import productService from "@/core/services/api/product-service";
import ProductDetail from "@/features/shop/components/product-detail";
import { Button } from "@/shared/components/ui/button";
import PageSpinner from "@/shared/components/ui/page-spinner";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { productSlug } = useParams();

  const { data, isFetching } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => productService.getBySlug(productSlug!),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <PageSpinner />;
  }

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-heading mb-4">Product not found</h1>
          <Link to="/">
            <Button variant="outline">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetail product={data} />;
};

export default ProductDetailPage;
