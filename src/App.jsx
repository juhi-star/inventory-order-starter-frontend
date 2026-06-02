const _jsxFileName = "";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { Route, Routes } from "react-router-dom";

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
  return (
    _jsxDEV(Routes, { children: [
      _jsxDEV(Route, { path: "/login", element: _jsxDEV(LoginPage, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 17}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 17}, this )
      , _jsxDEV(Route, { element: _jsxDEV(RequireAuth, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 18}, this ), children: 
        _jsxDEV(Route, { element: _jsxDEV(AppShell, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 19}, this ), children: [
          _jsxDEV(Route, { path: "/", element: _jsxDEV(DashboardPage, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 20}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 20}, this )
          , _jsxDEV(Route, { path: "/products", element: _jsxDEV(ProductsPage, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 21}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 21}, this )
          , _jsxDEV(Route, { path: "/customers", element: _jsxDEV(CustomersPage, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 22}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 22}, this )
          , _jsxDEV(Route, { path: "/orders", element: _jsxDEV(OrdersListPage, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 23}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 23}, this )
          , _jsxDEV(Route, { path: "/orders/new", element: _jsxDEV(OrderCreatePage, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 24}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 24}, this )
          , _jsxDEV(Route, { path: "/orders/:id", element: _jsxDEV(OrderDetailPage, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 25}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 25}, this )
          , _jsxDEV(Route, { path: "*", element: _jsxDEV(NotFoundPage, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 26}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 26}, this )
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 19}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 18}, this)
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 16}, this)
  );
}
