import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, it } from "vitest";




import {
  authReducer,
  clearAuth,
  selectAuthStatus,
  selectAuthUser,
  selectIsAuthenticated,
  setUser,
} from "./auth-slice";

const makeUser = (overrides = {}) => ({
  id: "u1",
  email: "admin@example.com",
  full_name: "Administrator",
  role: "admin",
  is_active: true,
  last_login_at: null,
  created_at: "2026-06-02T00:00:00Z",
  ...overrides,
});

const makeTestStore = () => configureStore({ reducer: { auth: authReducer } });

const asRoot = (state) => state ;

describe("authSlice", () => {
  it("starts idle with no user", () => {
    const store = makeTestStore();
    const state = asRoot(store.getState());
    expect(selectAuthUser(state)).toBeNull();
    expect(selectAuthStatus(state)).toBe("idle");
    expect(selectIsAuthenticated(state)).toBe(false);
  });

  it("setUser marks state authenticated", () => {
    const store = makeTestStore();
    const user = makeUser();
    store.dispatch(setUser(user));
    const state = asRoot(store.getState());
    expect(selectAuthUser(state)).toEqual(user);
    expect(selectAuthStatus(state)).toBe("authenticated");
    expect(selectIsAuthenticated(state)).toBe(true);
  });

  it("clearAuth removes user and marks unauthenticated", () => {
    const store = makeTestStore();
    store.dispatch(setUser(makeUser()));
    store.dispatch(clearAuth());
    const state = asRoot(store.getState());
    expect(selectAuthUser(state)).toBeNull();
    expect(selectAuthStatus(state)).toBe("unauthenticated");
    expect(selectIsAuthenticated(state)).toBe(false);
  });
});
