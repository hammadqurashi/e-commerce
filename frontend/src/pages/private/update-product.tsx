import ProductForm from "@/features/admin/products/components/product-form";
import { Button } from "@/shared/components/ui/button";
import { Link, useParams } from "react-router-dom";
import NotFound from "../public/not-found";
import { useQuery } from "@tanstack/react-query";
import productService from "@/core/services/api/product-service";
import PageSpinner from "@/shared/components/ui/page-spinner";

const UpdateProduct = () => {
  const { id: productId } = useParams();

  const { data, isFetching } = useQuery({
    queryKey: ["update-product", productId],
    queryFn: () => productService.getById(productId!),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <PageSpinner />;
  }

  if (!productId) {
    return <NotFound />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Update Product</h1>
          <p className="text-muted-foreground">
            Update product of your inventory
          </p>
        </div>
        <Link to="/admin/products">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>{" "}
      <ProductForm defaultValues={data} />
    </div>
  );
};

export default UpdateProduct;
