import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate, shortId } from "@/features/shared/format";
export function OrdersTable({
  orders
}) {
  if (orders.length === 0) {
    return <div className="rounded-md border border-dashed border-border py-12 text-center text-sm text-muted-foreground">No orders yet.</div>;
  }
  return <div className="rounded-md border border-border"><Table aria-label="Orders">
        <TableHeader><TableRow>
            <TableHead>Order</TableHead><TableHead>Customer</TableHead><TableHead className="text-right">Total</TableHead><TableHead>Status</TableHead><TableHead>Created</TableHead><TableHead className="w-20 text-right">View</TableHead></TableRow></TableHeader><TableBody>{orders.map((o) => (
            <TableRow key={o.id}>
              <TableCell className="font-mono text-xs">{shortId(o.id)}</TableCell>
<TableCell className="font-medium">{o.customer_name}</TableCell>
<TableCell className="text-right">{formatCurrency(o.total)}</TableCell>
<TableCell><Badge variant={o.status === "cancelled" ? "outline" : "default"}>{o.status}</Badge></TableCell>
<TableCell className="text-muted-foreground">{formatDate(o.created_at)}</TableCell>
<TableCell className="text-right"><Button asChild={true} size="icon" variant="ghost" aria-label={`View order ${shortId(o.id)}`}><Link to={`/orders/${o.id}`}><Eye className="h-4 w-4" /></Link></Button></TableCell></TableRow>
          ))}</TableBody></Table></div>;
}