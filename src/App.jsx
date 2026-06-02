import { Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { NotFoundPage } from "@/components/layout/NotFoundPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RequireAuth } from "@/features/auth/routes/require-auth";
import { CustomersPage } from "@/features/customers/pages/CustomersPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { OrderCreatePage } from "@/features/orders/pages/OrderCreatePage";
import { OrderDetailPage } from "@/features/orders/pages/OrderDetailPage";
import { OrdersListPage } from "@/features/orders/pages/OrdersListPage";
import { ProductsPage } from "@/features/products/pages/ProductsPage";
export function App() {
  return <Routes>
      <Route path="/login" element={<LoginPage />} /><Route element={<RequireAuth />}><Route element={<AppShell />}>
          <Route path="/" element={<DashboardPage />} /><Route path="/products" element={<ProductsPage />} /><Route path="/customers" element={<CustomersPage />} /><Route path="/orders" element={<OrdersListPage />} /><Route path="/orders/new" element={<OrderCreatePage />} /><Route path="/orders/:id" element={<OrderDetailPage />} /><Route path="*" element={<NotFoundPage />} /></Route></Route></Routes>;
}