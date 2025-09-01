import productService from "@/core/services/api/product-service";
import AllProducts from "@/features/admin/products/components/all-products";
import PageSpinner from "@/shared/components/ui/page-spinner";
import { useQuery } from "@tanstack/react-query";

const AllProductsPage = () => {
  const {
    data = [],
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => productService.getAll(),
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <PageSpinner />;
  }

  return <AllProducts products={data} refetch={refetch} />;
};

export default AllProductsPage;
