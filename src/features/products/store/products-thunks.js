import { createAsyncThunk } from "@reduxjs/toolkit";



import { apiClient } from "@/lib/api/client";

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const { data } = await apiClient.get("/products");
  return data;
});

export const createProduct = createAsyncThunk(
  "products/create",
  async (values) => {
    const { data } = await apiClient.post("/products", values);
    return data;
  },
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, values }) => {
    const { data } = await apiClient.put(`/products/${id}`, values);
    return data;
  },
);

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  await apiClient.delete(`/products/${id}`);
  return id;
});
