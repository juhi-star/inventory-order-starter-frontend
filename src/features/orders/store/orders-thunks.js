import { createAsyncThunk } from "@reduxjs/toolkit";



import { apiClient } from "@/lib/api/client";

export const fetchOrders = createAsyncThunk("orders/fetchAll", async () => {
  const { data } = await apiClient.get("/orders");
  return data;
});

export const fetchOrder = createAsyncThunk("orders/fetchOne", async (id) => {
  const { data } = await apiClient.get(`/orders/${id}`);
  return data;
});

export const createOrder = createAsyncThunk(
  "orders/create",
  async (values) => {
    const { data } = await apiClient.post("/orders", values);
    return data;
  },
);

export const cancelOrder = createAsyncThunk("orders/cancel", async (id) => {
  const { data } = await apiClient.post(`/orders/${id}/cancel`);
  return data;
});
