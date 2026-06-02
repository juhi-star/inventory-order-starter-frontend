const _jsxFileName = "";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { Skeleton } from "@/components/ui/skeleton";
import { hasAccessToken } from "@/lib/auth-storage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { selectAuthStatus, selectIsAuthenticated } from "../store/auth-slice";
import { fetchCurrentUserThunk } from "../store/auth-thunks";

export function RequireAuth() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const status = useAppSelector(selectAuthStatus);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [isInitializing, setIsInitializing] = useState(status === "idle");
  useEffect(() => {
    if (status !== "idle") {
      setIsInitializing(false);
      return;
    }
    if (!hasAccessToken()) {
      setIsInitializing(false);
      return;
    }
    void dispatch(fetchCurrentUserThunk()).finally(() => setIsInitializing(false));
  }, [status, dispatch]);
  if (isInitializing || status === "loading") {
    return (
      _jsxDEV('div', { className: "space-y-4 p-8" , children: [
        _jsxDEV(Skeleton, { className: "h-8 w-48" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 31}, this )
        , _jsxDEV(Skeleton, { className: "h-32 w-full" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 32}, this )
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 30}, this)
    );
  }
  if (!isAuthenticated) {
    return _jsxDEV(Navigate, { to: "/login", state: { from: location.pathname }, replace: true,}, void 0, false, {fileName: _jsxFileName, lineNumber: 37}, this );
  }
  return _jsxDEV(Outlet, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 39}, this );
}
