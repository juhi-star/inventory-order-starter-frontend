import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { LowStockTable } from "@/features/dashboard/components/LowStockTable";
import { SummaryCards } from "@/features/dashboard/components/SummaryCards";
import {
  selectDashboardError,
  selectDashboardStatus,
  selectDashboardSummary,
} from "@/features/dashboard/store/dashboard-slice";
import { fetchDashboardSummary } from "@/features/dashboard/store/dashboard-thunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
export function DashboardPage() {
  const dispatch = useAppDispatch();
  const summary = useAppSelector(selectDashboardSummary);
  const status = useAppSelector(selectDashboardStatus);
  const error = useAppSelector(selectDashboardError);
  useEffect(() => {
    void dispatch(fetchDashboardSummary());
  }, [dispatch]);
  const isLoading = status === "loading" || (status === "idle" && !summary);
  return (
    <section className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1><p className="text-sm text-muted-foreground">Inventory & order overview.</p></header>status === "failed" && error ? (
        <Alert variant="destructive">
          <AlertTitle>Could not load summary</AlertTitle><AlertDescription>error</AlertDescription></Alert>
      ) : nullisLoading || !summary ? (
        <DashboardSkeleton />
      ) : (
        <>
          <SummaryCards totalProducts={summary.total_products} totalCustomers={summary.total_customers} totalOrders={summary.total_orders} lowStockCount={summary.low_stock_count} /><LowStockTable products={summary.low_stock_products} /></>
      )</section>
  );
}
function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 4 }).map((_, i) => (
          <Skeleton className="h-28 w-full" key={i} />
        ))}</div><Skeleton className="h-72 w-full" /></div>
  );
}
