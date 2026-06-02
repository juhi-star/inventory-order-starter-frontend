import { createAsyncThunk } from "@reduxjs/toolkit";


import { ApiError, apiClient } from "@/lib/api/client";
import { clearTokens, getRefreshToken, setTokens } from "@/lib/auth-storage";















export const loginThunk = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/login", values);
      setTokens({
        access: response.data.tokens.access_token,
        refresh: response.data.tokens.refresh_token,
      });
      return response.data.user;
    } catch (error) {
      if (error instanceof ApiError) return rejectWithValue(error.message);
      throw error;
    }
  },
);

export const fetchCurrentUserThunk = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/auth/me");
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) return rejectWithValue(error.message);
      throw error;
    }
  },
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  try {
    if (getRefreshToken()) {
      await apiClient.post("/auth/logout");
    }
  } finally {
    clearTokens();
  }
});
