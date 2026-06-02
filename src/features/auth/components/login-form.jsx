import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginFormSchema } from "../schemas/login";
export function LoginForm({
  onSubmit,
  isSubmitting,
  errorMessage
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const handleSubmit = form.handleSubmit(async values => {
    await onSubmit(values);
  });
  const handleTogglePassword = () => setIsPasswordVisible(value => !value);
  return <Form><form onSubmit={handleSubmit} className="space-y-4" noValidate={true}>
        <FormField control={form.control} name="email" render={({
        field
      }) => <FormItem>
              <FormLabel>Email</FormLabel><FormControl><Input type="email" autoComplete="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="password" render={({
        field
      }) => <FormItem>
              <FormLabel>Password</FormLabel><FormControl><div className="relative">
                  <Input type={isPasswordVisible ? "text" : "password"} autoComplete="current-password" className="pr-10" {...field} /><button type="button" onClick={handleTogglePassword} aria-label={isPasswordVisible ? "Hide password" : "Show password"} aria-pressed={isPasswordVisible} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{isPasswordVisible ? (
                      <EyeOff className="h-4 w-4" aria-hidden={true} />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden={true} />
                    )}</button></div></FormControl><FormMessage /></FormItem>} />{errorMessage ? (
          <p role="alert" className="text-sm font-medium text-destructive">{errorMessage}</p>
        ) : null}<Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Signing in..." : "Sign in"}</Button></form></Form>;
}