const _jsxFileName = "";import {jsxDEV as _jsxDEV, Fragment as _Fragment} from "react/jsx-dev-runtime";import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { OrdersTable } from "@/features/orders/components/OrdersTable";
import {
  selectOrdersError,
  selectOrdersList,
  selectOrdersStatus,
} from "@/features/orders/store/orders-slice";
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
  return (
    _jsxDEV('section', { className: "flex flex-col gap-6"  , children: [
      _jsxDEV('header', { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"     , children: [
        _jsxDEV('div', { children: [
          _jsxDEV('h1', { className: "text-2xl font-semibold tracking-tight"  , children: "Orders"}, void 0, false, {fileName: _jsxFileName, lineNumber: 35}, this)
          , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: "Place and review customer orders."    }, void 0, false, {fileName: _jsxFileName, lineNumber: 36}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 34}, this)
        , _jsxDEV(Button, { asChild: true, children: 
          _jsxDEV(Link, { to: "/orders/new", children: [
            _jsxDEV(Plus, { className: "mr-2 h-4 w-4"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 40}, this ), "Create order"

          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 39}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 38}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 33}, this)
      , status === "failed" && error ? (
        _jsxDEV(Alert, { variant: "destructive", children: [
          _jsxDEV(AlertTitle, { children: "Could not load orders"   }, void 0, false, {fileName: _jsxFileName, lineNumber: 47}, this)
          , _jsxDEV(AlertDescription, { children: error}, void 0, false, {fileName: _jsxFileName, lineNumber: 48}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 46}, this)
      ) : null
      , status === "loading" && orders.length === 0 ? (
        _jsxDEV(Skeleton, { className: "h-72 w-full" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 52}, this )
      ) : (
        _jsxDEV(_Fragment, { children: [
          _jsxDEV(OrdersTable, { orders: paged,}, void 0, false, {fileName: _jsxFileName, lineNumber: 55}, this )
          , _jsxDEV('div', { className: "flex items-center justify-between text-sm text-muted-foreground"    , children: [
            _jsxDEV('span', { children: 
              orders.length === 0
                ? "0 orders"
                : `${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, orders.length)} of ${orders.length}`
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 57}, this)
            , _jsxDEV('div', { className: "flex gap-2" , children: [
              _jsxDEV(Button, {
                size: "sm",
                variant: "outline",
                onClick: () => setPage((p) => Math.max(1, p - 1)),
                disabled: currentPage <= 1,
 children: "Previous"

              }, void 0, false, {fileName: _jsxFileName, lineNumber: 63}, this)
              , _jsxDEV(Button, {
                size: "sm",
                variant: "outline",
                onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
                disabled: currentPage >= totalPages,
 children: "Next"

              }, void 0, false, {fileName: _jsxFileName, lineNumber: 71}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 62}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 56}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 54}, this)
      )
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 32}, this)
  );
}
