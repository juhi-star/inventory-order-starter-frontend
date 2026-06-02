import { createSelector, createSlice } from "@reduxjs/toolkit";




import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "./products-thunks";









const initialState = { list: [], status: "idle", error: null };

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load products";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.list = [action.payload, ...state.list];
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.list = state.list.map((p) => (p.id === action.payload.id ? action.payload : p));
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
      });
  },
});

export const productsReducer = productsSlice.reducer;

const selectProductsState = (state) => state.products;

export const selectProductsList = createSelector(selectProductsState, (s) => s.list);
export const selectProductsStatus = createSelector(selectProductsState, (s) => s.status);
export const selectProductsError = createSelector(selectProductsState, (s) => s.error);
export const selectLowStockProducts = createSelector(selectProductsList, (list) =>
  list.filter((p) => p.qty <= 10).sort((a, b) => a.qty - b.qty),
);
