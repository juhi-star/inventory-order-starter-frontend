import { createAsyncThunk } from "@reduxjs/toolkit";


import { apiClient } from "@/lib/api/client";

export const fetchDashboardSummary = createAsyncThunk(
  "dashboard/fetchSummary",
  async () => {
    const { data } = await apiClient.get("/dashboard/summary");
    return data;
  },
);
