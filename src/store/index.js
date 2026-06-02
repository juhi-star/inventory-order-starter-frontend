import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "@/features/auth/store/auth-slice";
import { customersReducer } from "@/features/customers/store/customers-slice";
import { dashboardReducer } from "@/features/dashboard/store/dashboard-slice";
import { ordersReducer } from "@/features/orders/store/orders-slice";
import { productsReducer } from "@/features/products/store/products-slice";

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      products: productsReducer,
      customers: customersReducer,
      orders: ordersReducer,
      dashboard: dashboardReducer,
    },
  });

export const store = makeStore();

 


