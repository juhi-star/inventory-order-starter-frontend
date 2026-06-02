import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productFormSchema } from "@/features/products/schemas/product";
const EMPTY_DEFAULTS = {
  name: "",
  sku: "",
  price: 0,
  qty: 0
};
export function ProductForm({
  initial,
  isSubmitting,
  onSubmit,
  onCancel
}) {
  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: initial ? {
      name: initial.name,
      sku: initial.sku,
      price: initial.price,
      qty: initial.qty
    } : EMPTY_DEFAULTS
  });
  useEffect(() => {
    if (initial) form.reset({
      name: initial.name,
      sku: initial.sku,
      price: initial.price,
      qty: initial.qty
    });else form.reset(EMPTY_DEFAULTS);
  }, [initial, form]);
  return <Form><form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField control={form.control} name="name" render={({
        field
      }) => <FormItem>
              <FormLabel>Name</FormLabel><FormControl><Input placeholder="Wireless Mouse" /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="sku" render={({
        field
      }) => <FormItem>
              <FormLabel>SKU</FormLabel><FormControl><Input placeholder="WM-001" className="font-mono" /></FormControl><FormMessage /></FormItem>} /><div className="grid grid-cols-2 gap-4">
          <FormField control={form.control} name="price" render={({
          field
        }) => <FormItem>
                <FormLabel>Price (USD)</FormLabel><FormControl><Input type="number" step="0.01" min="0" /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="qty" render={({
          field
        }) => <FormItem>
                <FormLabel>Quantity</FormLabel><FormControl><Input type="number" step="1" min="0" /></FormControl><FormMessage /></FormItem>} /></div><div className="flex justify-end gap-2 pt-2">
<Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>Cancel</Button>
<Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : initial ? "Save changes" : "Create"}</Button></div></form></Form>;
}