import { createAsyncThunk } from "@reduxjs/toolkit";



import { apiClient } from "@/lib/api/client";

export const fetchCustomers = createAsyncThunk("customers/fetchAll", async () => {
  const { data } = await apiClient.get("/customers");
  return data;
});

export const createCustomer = createAsyncThunk(
  "customers/create",
  async (values) => {
    const { data } = await apiClient.post("/customers", values);
    return data;
  },
);

export const deleteCustomer = createAsyncThunk("customers/delete", async (id) => {
  await apiClient.delete(`/customers/${id}`);
  return id;
});
