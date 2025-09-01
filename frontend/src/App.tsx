import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootProvider from "./shared/providers";
import { AUTH_ROUTE } from "./core/routes";
import AuthPage from "./pages/public/auth-page";
import PublicLayout from "./shared/layout/public-layout";
import Products from "./pages/public/products";
import ProductDetailPage from "./pages/public/product-detail";
import CartPage from "./pages/public/cart-page";
import AdminLayout from "./shared/layout/admin-layout";
import AllProductsPage from "./pages/private/all-products";
import CreateProduct from "./pages/private/create-product";
import UpdateProduct from "./pages/private/update-product";
import NotFound from "./pages/public/not-found";

function App() {
  return (
    <RootProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path={AUTH_ROUTE} element={<AuthPage />} />

          {/* Public Web Pages */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Products />} />
            <Route
              path="product/:productSlug"
              element={<ProductDetailPage />}
            />
            <Route path="cart" element={<CartPage />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="products" element={<AllProductsPage />} />
            <Route path="products/create" element={<CreateProduct />} />
            <Route
              path="products/:productSlug/edit"
              element={<UpdateProduct />}
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </RootProvider>
  );
}

export default App;
