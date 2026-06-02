import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LoginForm } from "../components/login-form";
import {
  selectAuthError,
  selectAuthStatus,
  selectIsAuthenticated,
} from "../store/auth-slice";
import { loginThunk } from "../store/auth-thunks";
export function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const status = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const from = ((location.state )?.from ?? "/");
  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);
  const handleSubmit = async (values) => {
    const result = await dispatch(loginThunk(values));
    if (loginThunk.fulfilled.match(result)) navigate(from, { replace: true });
  };
  if (isAuthenticated) return <Navigate to={from} replace={true} />;
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4"><Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle><CardDescription>Use your administrator credentials.</CardDescription></CardHeader><CardContent><LoginForm onSubmit={handleSubmit} isSubmitting={status === "loading"} errorMessage={error} /></CardContent></Card></div>
  );
}
