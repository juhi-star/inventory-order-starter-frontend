import { createSelector, createSlice } from "@reduxjs/toolkit";




import { createCustomer, deleteCustomer, fetchCustomers } from "./customers-thunks";









const initialState = { list: [], status: "idle", error: null };

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load customers";
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.list = [action.payload, ...state.list];
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.id !== action.payload);
      });
  },
});

export const customersReducer = customersSlice.reducer;

const selectCustomersState = (state) => state.customers;

export const selectCustomersList = createSelector(selectCustomersState, (s) => s.list);
export const selectCustomersStatus = createSelector(selectCustomersState, (s) => s.status);
export const selectCustomersError = createSelector(selectCustomersState, (s) => s.error);
