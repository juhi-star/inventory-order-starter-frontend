import { createSelector, createSlice } from "@reduxjs/toolkit";




import { cancelOrder, createOrder, fetchOrder, fetchOrders } from "./orders-thunks";










const initialState = { list: [], current: null, status: "idle", error: null };

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load orders";
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.list = [action.payload, ...state.list];
        state.current = action.payload;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.list = state.list.map((o) => (o.id === action.payload.id ? action.payload : o));
        if (state.current?.id === action.payload.id) state.current = action.payload;
      });
  },
});

export const ordersReducer = ordersSlice.reducer;

const selectOrdersState = (state) => state.orders;

export const selectOrdersList = createSelector(selectOrdersState, (s) => s.list);
export const selectCurrentOrder = createSelector(selectOrdersState, (s) => s.current);
export const selectOrdersStatus = createSelector(selectOrdersState, (s) => s.status);
export const selectOrdersError = createSelector(selectOrdersState, (s) => s.error);
