import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { orderFormSchema, } from "@/features/orders/schemas/order";
import { formatCurrency } from "@/features/shared/format";
export function OrderCreateForm({ customers, products, isSubmitting, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(orderFormSchema),
    defaultValues: { customer_id: "", lines: [{ product_id: "", qty: 1 }] },
  });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "lines" });
  const watchedLines = useWatch({ control: form.control, name: "lines" });
  const total = ((watchedLines ?? ( []))).reduce((sum, l) => {
    const product = products.find((p) => p.id === l?.product_id);
    if (!product) return sum;
    const qty = Number(l?.qty) || 0;
    return sum + product.price * qty;
  }, 0);
  return (
    <Form><form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FormField control={form.control} name="customer_id" render={({ field }) => (
            <FormItem>
              <FormLabel>Customer</FormLabel><Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Pick a customer" /></SelectTrigger></FormControl><SelectContent>{customers.map((c) => (
                    <SelectItem value={c.id} key={c.id}>
                      {c.full_name} ({c.email})</SelectItem>
                  ))}</SelectContent></Select><FormMessage /></FormItem>
          )} /><div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Line items</h2><Button type="button" size="sm" variant="outline" onClick={() => append({ product_id: "", qty: 1 })}>
              <Plus className="mr-1 h-4 w-4" /> Add line</Button></div>{form?.formState?.errors?.lines?.root ? (
            <p className="text-sm text-destructive">{form.formState.errors.lines.root.message}</p>
          ) : null}
{fields.map((fieldRow, index) => (
            <div className="grid grid-cols-1 gap-3 rounded-md border border-border p-3 sm:grid-cols-[1fr,120px,40px]" key={fieldRow.id}>
              <FormField control={form.control} name={`lines.$index.product_id`} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product</FormLabel><Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Pick product" /></SelectTrigger></FormControl><SelectContent>{products.map((p) => (
                          <SelectItem value={p.id} key={p.id}>
                            {p.name} \u2014 {formatCurrency(p.price)} (qty {p.qty})</SelectItem>
                        ))}</SelectContent></Select><FormMessage /></FormItem>
                )} /><FormField control={form.control} name={`lines.$index.qty`} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qty</FormLabel><FormControl><Input type="number" step="1" min="1" /></FormControl><FormMessage /></FormItem>
                )} /><div className="flex items-end"><Button type="button" size="icon" variant="ghost" aria-label={`Remove line ${index + 1}`} onClick={() => remove(index)} disabled={fields.length <= 1}><Trash2 className="h-4 w-4" /></Button></div></div>
                    ))}</div>
<Separator /><div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total</span><span className="text-xl font-semibold">{formatCurrency(total)}</span></div><div className="flex justify-end"><Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Placing..." : "Place order"}</Button></div></form></Form>
  );
}
