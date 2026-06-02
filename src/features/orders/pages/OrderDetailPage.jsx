const _jsxFileName = "";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CancelOrderDialog } from "@/features/orders/components/CancelOrderDialog";
import {
  selectCurrentOrder,
  selectOrdersError,
  selectOrdersStatus,
} from "@/features/orders/store/orders-slice";
import { cancelOrder, fetchOrder } from "@/features/orders/store/orders-thunks";
import { getErrorMessage } from "@/features/shared/api-error";
import { formatCurrency, formatDate, shortId } from "@/features/shared/format";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function OrderDetailPage() {
  const { id } = useParams();
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
    return (
      _jsxDEV(Alert, { variant: "destructive", children: [
        _jsxDEV(AlertTitle, { children: "Could not load order"   }, void 0, false, {fileName: _jsxFileName, lineNumber: 57}, this)
        , _jsxDEV(AlertDescription, { children: error}, void 0, false, {fileName: _jsxFileName, lineNumber: 58}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 56}, this)
    );
  }
  if (!order || order.id !== id) return _jsxDEV(Skeleton, { className: "h-96 w-full" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 62}, this );
  return (
    _jsxDEV('section', { className: "flex flex-col gap-6"  , children: [
      _jsxDEV('header', { className: "flex flex-col gap-2"  , children: [
        _jsxDEV(Button, { asChild: true, variant: "ghost", size: "sm", className: "w-fit -ml-2" , children: 
          _jsxDEV(Link, { to: "/orders", children: [
            _jsxDEV(ArrowLeft, { className: "mr-1 h-4 w-4"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 68}, this ), "Back to orders"

          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 67}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 66}, this)
        , _jsxDEV('div', { className: "flex flex-wrap items-center gap-3"   , children: [
          _jsxDEV('h1', { className: "text-2xl font-semibold tracking-tight"  , children: ["Order " , shortId(order.id)]}, void 0, true, {fileName: _jsxFileName, lineNumber: 73}, this)
          , _jsxDEV(Badge, { variant: order.status === "cancelled" ? "outline" : "default", children: order.status}, void 0, false, {fileName: _jsxFileName, lineNumber: 74}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 72}, this)
        , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: [
          order.customer_name, " \\u00b7 "  , formatDate(order.created_at)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 76}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 65}, this)
      , _jsxDEV(Card, { children: [
        _jsxDEV(CardHeader, { children: 
          _jsxDEV(CardTitle, { children: "Line items" }, void 0, false, {fileName: _jsxFileName, lineNumber: 82}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 81}, this)
        , _jsxDEV(CardContent, { children: 
          _jsxDEV(Table, { 'aria-label': "Order line items"  , children: [
            _jsxDEV(TableHeader, { children: 
              _jsxDEV(TableRow, { children: [
                _jsxDEV(TableHead, { children: "Product"}, void 0, false, {fileName: _jsxFileName, lineNumber: 88}, this)
                , _jsxDEV(TableHead, { className: "text-right", children: "Qty"}, void 0, false, {fileName: _jsxFileName, lineNumber: 89}, this)
                , _jsxDEV(TableHead, { className: "text-right", children: "Unit price" }, void 0, false, {fileName: _jsxFileName, lineNumber: 90}, this)
                , _jsxDEV(TableHead, { className: "text-right", children: "Subtotal"}, void 0, false, {fileName: _jsxFileName, lineNumber: 91}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 87}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 86}, this)
            , _jsxDEV(TableBody, { children: 
              order.lines.map((line) => (
                _jsxDEV(TableRow, { children: [
                  _jsxDEV(TableCell, { className: "font-medium", children: line.product_name}, void 0, false, {fileName: _jsxFileName, lineNumber: 97}, this)
                  , _jsxDEV(TableCell, { className: "text-right", children: line.qty}, void 0, false, {fileName: _jsxFileName, lineNumber: 98}, this)
                  , _jsxDEV(TableCell, { className: "text-right", children: formatCurrency(line.unit_price)}, void 0, false, {fileName: _jsxFileName, lineNumber: 99}, this)
                  , _jsxDEV(TableCell, { className: "text-right", children: formatCurrency(line.subtotal)}, void 0, false, {fileName: _jsxFileName, lineNumber: 100}, this)
                ]}, line.product_id, true, {fileName: _jsxFileName, lineNumber: 96}, this)
              ))
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 94}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 85}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 84}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 80}, this)
      , _jsxDEV('div', { className: "flex items-center justify-between rounded-md border border-border bg-card p-4"       , children: [
        _jsxDEV('span', { className: "text-sm text-muted-foreground" , children: "Total"}, void 0, false, {fileName: _jsxFileName, lineNumber: 108}, this)
        , _jsxDEV('span', { className: "text-2xl font-semibold" , children: formatCurrency(order.total)}, void 0, false, {fileName: _jsxFileName, lineNumber: 109}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 107}, this)
      , order.status !== "cancelled" ? (
        _jsxDEV('div', { className: "flex justify-end" , children: 
          _jsxDEV(Button, { variant: "destructive", onClick: () => setIsCancelOpen(true), children: "Cancel order"

          }, void 0, false, {fileName: _jsxFileName, lineNumber: 113}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 112}, this)
      ) : null
      , _jsxDEV(CancelOrderDialog, {
        isOpen: isCancelOpen,
        isCancelling: isCancelling,
        onConfirm: handleConfirmCancel,
        onClose: () => setIsCancelOpen(false),}, void 0, false, {fileName: _jsxFileName, lineNumber: 118}, this
      )
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 64}, this)
  );
}
