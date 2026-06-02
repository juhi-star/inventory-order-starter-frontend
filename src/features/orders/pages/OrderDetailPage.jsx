import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CancelOrderDialog } from "@/features/orders/components/CancelOrderDialog";
import { selectCurrentOrder, selectOrdersError, selectOrdersStatus } from "@/features/orders/store/orders-slice";
import { cancelOrder, fetchOrder } from "@/features/orders/store/orders-thunks";
import { getErrorMessage } from "@/features/shared/api-error";
import { formatCurrency, formatDate, shortId } from "@/features/shared/format";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
export function OrderDetailPage() {
  const {
    id
  } = useParams();
  const dispatch = useAppDispatch();
  const order = useAppSelector(selectCurrentOrder);
  const status = useAppSelector(selectOrdersStatus);
  const error = useAppSelector(selectOrdersError);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  useEffect(() => {
    if (id) void dispatch(fetchOrder(id));
  }, [dispatch, id]);
  const handleConfirmCancel = async () => {
    if (!order) return;
    setIsCancelling(true);
    try {
      await dispatch(cancelOrder(order.id)).unwrap();
      toast.success("Order cancelled");
      setIsCancelOpen(false);
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setIsCancelling(false);
    }
  };
  if (status === "failed" && error) {
    return <Alert variant="destructive">
        <AlertTitle>Could not load order</AlertTitle><AlertDescription>error</AlertDescription></Alert>;
  }
  if (!order || order.id !== id) return <Skeleton className="h-96 w-full" />;
  return <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <Button asChild={true} variant="ghost" size="sm" className="w-fit -ml-2"><Link to="/orders">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to orders</Link></Button><div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">
Order {shortId(order.id)}</h1><Badge variant={order.status === "cancelled" ? "outline" : "default"}>{order.status}</Badge></div><p className="text-sm text-muted-foreground">
          {order.customer_name} &middot; {formatDate(order.created_at)}</p></header><Card>
        <CardHeader><CardTitle>Line items</CardTitle></CardHeader><CardContent><Table aria-label="Order line items">
            <TableHeader><TableRow>
                <TableHead>Product</TableHead><TableHead className="text-right">Qty</TableHead><TableHead className="text-right">Unit price</TableHead><TableHead className="text-right">Subtotal</TableHead></TableRow></TableHeader><TableBody>{order.lines.map((line) => (
                <TableRow key={line.product_id}>
                  <TableCell className="font-medium">{line.product_name}</TableCell><TableCell className="text-right">{line.qty}</TableCell><TableCell className="text-right">{formatCurrency(line.unit_price)}</TableCell><TableCell className="text-right">{formatCurrency(line.subtotal)}</TableCell></TableRow>
              ))}</TableBody></Table></CardContent></Card><div className="flex items-center justify-between rounded-md border border-border bg-card p-4">
        <span className="text-sm text-muted-foreground">Total</span><span className="text-2xl font-semibold">{formatCurrency(order.total)}</span></div>{order.status !== "cancelled" ? (
        <div className="flex justify-end"><Button variant="destructive" onClick={() => setIsCancelOpen(true)}>Cancel order</Button></div>
            ) : null}
<CancelOrderDialog isOpen={isCancelOpen} isCancelling={isCancelling} onConfirm={handleConfirmCancel} onClose={() => setIsCancelOpen(false)} /></section>;
}