const _jsxFileName = "";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime"; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { useEffect } from "react";
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
  const from = _nullishCoalesce(_optionalChain([(location.state ), 'optionalAccess', _ => _.from]), () => ( "/"));
  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);
  const handleSubmit = async (values) => {
    const result = await dispatch(loginThunk(values));
    if (loginThunk.fulfilled.match(result)) navigate(from, { replace: true });
  };
  if (isAuthenticated) return _jsxDEV(Navigate, { to: from, replace: true,}, void 0, false, {fileName: _jsxFileName, lineNumber: 41}, this );
  return (
    _jsxDEV('div', { className: "flex min-h-screen items-center justify-center bg-background px-4"     , children: 
      _jsxDEV(Card, { className: "w-full max-w-sm" , children: [
        _jsxDEV(CardHeader, { children: [
          _jsxDEV(CardTitle, { children: "Sign in" }, void 0, false, {fileName: _jsxFileName, lineNumber: 46}, this)
          , _jsxDEV(CardDescription, { children: "Use your administrator credentials."   }, void 0, false, {fileName: _jsxFileName, lineNumber: 47}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 45}, this)
        , _jsxDEV(CardContent, { children: 
          _jsxDEV(LoginForm, {
            onSubmit: handleSubmit,
            isSubmitting: status === "loading",
            errorMessage: error,}, void 0, false, {fileName: _jsxFileName, lineNumber: 50}, this
          )
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 49}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 44}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 43}, this)
  );
}
