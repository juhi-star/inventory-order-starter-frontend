import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { OrdersTable } from "@/features/orders/components/OrdersTable";
import { selectOrdersError, selectOrdersList, selectOrdersStatus } from "@/features/orders/store/orders-slice";
import { fetchOrders } from "@/features/orders/store/orders-thunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
const PAGE_SIZE = 10;
export function OrdersListPage() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrdersList);
  const status = useAppSelector(selectOrdersStatus);
  const error = useAppSelector(selectOrdersError);
  const [page, setPage] = useState(1);
  useEffect(() => {
    void dispatch(fetchOrders());
  }, [dispatch]);
  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = orders.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  return <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Orders</h1><p className="text-sm text-muted-foreground">Place and review customer orders.</p></div><Button asChild={true}><Link to="/orders/new">
            <Plus className="mr-2 h-4 w-4" />, "Create order"</Link></Button></header>status === "failed" && error ? (
        <Alert variant="destructive">
          <AlertTitle>Could not load orders</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>
      ) : nullstatus === "loading" && orders.length === 0 ? (
        <Skeleton className="h-72 w-full" />
      ) : (
        <>
          <OrdersTable orders={paged} /><div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{orders.length === 0
                ? "0 orders"
                : `${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, orders.length)} of ${orders.length}`}</span><div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={currentPage <= 1}>Previous</Button><Button size="sm" variant="outline" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={currentPage >= totalPages}>Next</Button></div></div></>
      )</section>;
}