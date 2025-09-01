import ProductForm from "@/features/admin/products/components/product-form";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";

const CreateProduct = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Create Product</h1>
          <p className="text-muted-foreground">
            Add a new product to your inventory
          </p>
        </div>
        <Link to="/admin/products">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>{" "}
      <ProductForm />
    </div>
  );
};

export default CreateProduct;
