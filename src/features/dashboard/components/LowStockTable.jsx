import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/features/shared/format";
export function LowStockTable({
  products
}) {
  return <Card>
      <CardHeader><CardTitle>Low stock products</CardTitle></CardHeader><CardContent>{products.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No low stock items.</p>
        ) : (
          <Table aria-label="Low stock products">
            <TableHeader><TableRow>
                <TableHead>Name</TableHead><TableHead>SKU</TableHead><TableHead className="text-right">Price</TableHead><TableHead className="text-right">Qty</TableHead></TableRow></TableHeader><TableBody>{products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell><TableCell className="font-mono text-xs">{p.sku}</TableCell><TableCell className="text-right">{formatCurrency(p.price)}</TableCell><TableCell className="text-right"><Badge variant={p.qty === 0 ? "destructive" : "secondary"}>{p.qty}</Badge></TableCell></TableRow>
              ))}</TableBody></Table>
        )}</CardContent></Card>;
}