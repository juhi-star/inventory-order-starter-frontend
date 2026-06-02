 function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }import { createSelector, createSlice } from "@reduxjs/toolkit";




import { fetchDashboardSummary } from "./dashboard-thunks";









const initialState = { summary: null, status: "idle", error: null };

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardSummary.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.summary = action.payload;
      })
      .addCase(fetchDashboardSummary.rejected, (state, action) => {
        state.status = "failed";
        state.error = _nullishCoalesce(action.error.message, () => ( "Failed to load dashboard"));
      });
  },
});

export const dashboardReducer = dashboardSlice.reducer;

const selectDashboardState = (state) => state.dashboard;

export const selectDashboardSummary = createSelector(selectDashboardState, (s) => s.summary);
export const selectDashboardStatus = createSelector(selectDashboardState, (s) => s.status);
export const selectDashboardError = createSelector(selectDashboardState, (s) => s.error);
