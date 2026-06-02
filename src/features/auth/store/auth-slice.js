import { createSelector, createSlice, } from "@reduxjs/toolkit";




import { fetchCurrentUserThunk, loginThunk, logoutThunk } from "./auth-thunks";

 







const initialState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.status = "authenticated";
      state.error = null;
    },
    clearAuth(state) {
      state.user = null;
      state.status = "unauthenticated";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "authenticated";
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? action.error.message ?? "Login failed";
      })
      .addCase(fetchCurrentUserThunk.pending, (state) => {
        if (state.status === "idle") state.status = "loading";
      })
      .addCase(fetchCurrentUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "authenticated";
      })
      .addCase(fetchCurrentUserThunk.rejected, (state) => {
        state.user = null;
        state.status = "unauthenticated";
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.status = "unauthenticated";
        state.error = null;
      });
  },
});

export const { setUser, clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;

const selectAuth = (state) => state.auth;

export const selectAuthUser = createSelector(selectAuth, (auth) => auth.user);
export const selectAuthStatus = createSelector(selectAuth, (auth) => auth.status);
export const selectAuthError = createSelector(selectAuth, (auth) => auth.error);
export const selectIsAuthenticated = createSelector(
  selectAuth,
  (auth) => auth.status === "authenticated" && auth.user !== null,
);
