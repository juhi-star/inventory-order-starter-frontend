const _jsxFileName = "";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { loginFormSchema } from "../schemas/login";







export function LoginForm({ onSubmit, isSubmitting, errorMessage }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });
  const handleSubmit = form.handleSubmit(async (values) => {
    await onSubmit(values);
  });
  const handleTogglePassword = () => setIsPasswordVisible((value) => !value);
  return (
    _jsxDEV(Form, { ...form, children: 
      _jsxDEV('form', { onSubmit: handleSubmit, className: "space-y-4", noValidate: true, children: [
        _jsxDEV(FormField, {
          control: form.control,
          name: "email",
          render: ({ field }) => (
            _jsxDEV(FormItem, { children: [
              _jsxDEV(FormLabel, { children: "Email"}, void 0, false, {fileName: _jsxFileName, lineNumber: 43}, this)
              , _jsxDEV(FormControl, { children: 
                _jsxDEV(Input, { type: "email", autoComplete: "email", placeholder: "you@example.com", ...field,}, void 0, false, {fileName: _jsxFileName, lineNumber: 45}, this )
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 44}, this)
              , _jsxDEV(FormMessage, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 47}, this )
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 42}, this)
          ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 38}, this
        )
        , _jsxDEV(FormField, {
          control: form.control,
          name: "password",
          render: ({ field }) => (
            _jsxDEV(FormItem, { children: [
              _jsxDEV(FormLabel, { children: "Password"}, void 0, false, {fileName: _jsxFileName, lineNumber: 56}, this)
              , _jsxDEV(FormControl, { children: 
                _jsxDEV('div', { className: "relative", children: [
                  _jsxDEV(Input, {
                    type: isPasswordVisible ? "text" : "password",
                    autoComplete: "current-password",
                    className: "pr-10",
                    ...field,}, void 0, false, {fileName: _jsxFileName, lineNumber: 59}, this
                  )
                  , _jsxDEV('button', {
                    type: "button",
                    onClick: handleTogglePassword,
                    'aria-label': isPasswordVisible ? "Hide password" : "Show password",
                    'aria-pressed': isPasswordVisible,
                    className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"           ,
 children: 
                    isPasswordVisible ? (
                      _jsxDEV(EyeOff, { className: "h-4 w-4" , 'aria-hidden': true,}, void 0, false, {fileName: _jsxFileName, lineNumber: 73}, this )
                    ) : (
                      _jsxDEV(Eye, { className: "h-4 w-4" , 'aria-hidden': true,}, void 0, false, {fileName: _jsxFileName, lineNumber: 75}, this )
                    )
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 65}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 58}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 57}, this)
              , _jsxDEV(FormMessage, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 80}, this )
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 55}, this)
          ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 51}, this
        )
        , errorMessage ? (
          _jsxDEV('p', { role: "alert", className: "text-sm font-medium text-destructive"  , children: 
            errorMessage
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 85}, this)
        ) : null
        , _jsxDEV(Button, { type: "submit", className: "w-full", disabled: isSubmitting, children: 
          isSubmitting ? "Signing in..." : "Sign in"
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 89}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 37}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 36}, this)
  );
}
