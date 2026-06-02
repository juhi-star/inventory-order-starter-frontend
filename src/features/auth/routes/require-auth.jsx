import { useEffect, useState } from "react";
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
    return <div className="space-y-4 p-8">
        <Skeleton className="h-8 w-48" /><Skeleton className="h-32 w-full" /></div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{
      from: location.pathname
    }} replace={true} />;
  }
  return <Outlet />;
}