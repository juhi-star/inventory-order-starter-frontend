import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { customerFormSchema } from "@/features/customers/schemas/customer";
const EMPTY_DEFAULTS = {
  full_name: "",
  email: "",
  phone: ""
};
export function CustomerForm({
  isSubmitting,
  onSubmit,
  onCancel
}) {
  const form = useForm({
    resolver: zodResolver(customerFormSchema),
    defaultValues: EMPTY_DEFAULTS
  });
  return <Form><form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField control={form.control} name="full_name" render={({
        field
      }) => <FormItem>
              <FormLabel>Full name</FormLabel><FormControl><Input placeholder="Alice Chen" /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="email" render={({
        field
      }) => <FormItem>
              <FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="alice@example.com" /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="phone" render={({
        field
      }) => <FormItem>
              <FormLabel>Phone</FormLabel><FormControl><Input placeholder="+14155551001" className="font-mono" /></FormControl><FormMessage /></FormItem>} /><div className="flex justify-end gap-2 pt-2">
<Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>Cancel</Button>
<Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Create"}</Button></div></form></Form>;
}