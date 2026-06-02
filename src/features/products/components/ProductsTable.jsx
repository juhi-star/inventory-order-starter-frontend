import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/features/shared/format";
const LOW_STOCK_THRESHOLD = 10;
export function ProductsTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border py-12 text-center text-sm text-muted-foreground">No products match your search.</div>
    );
  }
  return (
    <div className="rounded-md border border-border"><Table aria-label="Products">
        <TableHeader><TableRow>
            <TableHead>Name</TableHead><TableHead>SKU</TableHead><TableHead className="text-right">Price</TableHead><TableHead className="text-right">Qty</TableHead><TableHead className="w-32 text-right">Actions</TableHead></TableRow></TableHeader><TableBody>{products.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">{p.name}</TableCell><TableCell className="font-mono text-xs">{p.sku}</TableCell><TableCell className="text-right">{formatCurrency(p.price)}</TableCell><TableCell className="text-right">{p.qty <= LOW_STOCK_THRESHOLD ? (
                  <Badge variant={p.qty === 0 ? "destructive" : "secondary"}>
{p.qty} low</Badge>
                ) : (
                  <span>{p.qty}</span>
                )}</TableCell><TableCell className="text-right"><div className="flex justify-end gap-1">
                  <Button size="icon" variant="ghost" aria-label={`Edit ${p.name}`} onClick={() => onEdit(p)}><Pencil className="h-4 w-4" /></Button><Button size="icon" variant="ghost" aria-label={`Delete ${p.name}`} onClick={() => onDelete(p)}><Trash2 className="h-4 w-4" /></Button></div></TableCell></TableRow>
          ))}</TableBody></Table></div>
  );
}
