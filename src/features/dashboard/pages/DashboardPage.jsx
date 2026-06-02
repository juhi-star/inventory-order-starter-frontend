const _jsxFileName = "";import {jsxDEV as _jsxDEV, Fragment as _Fragment} from "react/jsx-dev-runtime";import { useEffect } from "react";

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
    _jsxDEV('section', { className: "flex flex-col gap-6"  , children: [
      _jsxDEV('header', { children: [
        _jsxDEV('h1', { className: "text-2xl font-semibold tracking-tight"  , children: "Dashboard"}, void 0, false, {fileName: _jsxFileName, lineNumber: 27}, this)
        , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: "Inventory & order overview."   }, void 0, false, {fileName: _jsxFileName, lineNumber: 28}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 26}, this)
      , status === "failed" && error ? (
        _jsxDEV(Alert, { variant: "destructive", children: [
          _jsxDEV(AlertTitle, { children: "Could not load summary"   }, void 0, false, {fileName: _jsxFileName, lineNumber: 32}, this)
          , _jsxDEV(AlertDescription, { children: error}, void 0, false, {fileName: _jsxFileName, lineNumber: 33}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 31}, this)
      ) : null
      , isLoading || !summary ? (
        _jsxDEV(DashboardSkeleton, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 37}, this )
      ) : (
        _jsxDEV(_Fragment, { children: [
          _jsxDEV(SummaryCards, {
            totalProducts: summary.total_products,
            totalCustomers: summary.total_customers,
            totalOrders: summary.total_orders,
            lowStockCount: summary.low_stock_count,}, void 0, false, {fileName: _jsxFileName, lineNumber: 40}, this
          )
          , _jsxDEV(LowStockTable, { products: summary.low_stock_products,}, void 0, false, {fileName: _jsxFileName, lineNumber: 46}, this )
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 39}, this)
      )
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 25}, this)
  );
}

function DashboardSkeleton() {
  return (
    _jsxDEV('div', { className: "flex flex-col gap-6"  , children: [
      _jsxDEV('div', { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"    , children: 
        Array.from({ length: 4 }).map((_, i) => (
          _jsxDEV(Skeleton, { className: "h-28 w-full" ,}, i, false, {fileName: _jsxFileName, lineNumber: 58}, this )
        ))
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 56}, this)
      , _jsxDEV(Skeleton, { className: "h-72 w-full" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 61}, this )
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 55}, this)
  );
}
