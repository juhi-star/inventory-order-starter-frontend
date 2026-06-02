const _jsxFileName = "";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

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
import { formatCurrency, formatDate, shortId } from "@/features/shared/format";






export function OrdersTable({ orders }) {
  if (orders.length === 0) {
    return (
      _jsxDEV('div', { className: "rounded-md border border-dashed border-border py-12 text-center text-sm text-muted-foreground"       , children: "No orders yet."

      }, void 0, false, {fileName: _jsxFileName, lineNumber: 24}, this)
    );
  }
  return (
    _jsxDEV('div', { className: "rounded-md border border-border"  , children: 
      _jsxDEV(Table, { 'aria-label': "Orders", children: [
        _jsxDEV(TableHeader, { children: 
          _jsxDEV(TableRow, { children: [
            _jsxDEV(TableHead, { children: "Order"}, void 0, false, {fileName: _jsxFileName, lineNumber: 34}, this)
            , _jsxDEV(TableHead, { children: "Customer"}, void 0, false, {fileName: _jsxFileName, lineNumber: 35}, this)
            , _jsxDEV(TableHead, { className: "text-right", children: "Total"}, void 0, false, {fileName: _jsxFileName, lineNumber: 36}, this)
            , _jsxDEV(TableHead, { children: "Status"}, void 0, false, {fileName: _jsxFileName, lineNumber: 37}, this)
            , _jsxDEV(TableHead, { children: "Created"}, void 0, false, {fileName: _jsxFileName, lineNumber: 38}, this)
            , _jsxDEV(TableHead, { className: "w-20 text-right" , children: "View"}, void 0, false, {fileName: _jsxFileName, lineNumber: 39}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 33}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 32}, this)
        , _jsxDEV(TableBody, { children: 
          orders.map((o) => (
            _jsxDEV(TableRow, { children: [
              _jsxDEV(TableCell, { className: "font-mono text-xs" , children: shortId(o.id)}, void 0, false, {fileName: _jsxFileName, lineNumber: 45}, this)
              , _jsxDEV(TableCell, { className: "font-medium", children: o.customer_name}, void 0, false, {fileName: _jsxFileName, lineNumber: 46}, this)
              , _jsxDEV(TableCell, { className: "text-right", children: formatCurrency(o.total)}, void 0, false, {fileName: _jsxFileName, lineNumber: 47}, this)
              , _jsxDEV(TableCell, { children: 
                _jsxDEV(Badge, { variant: o.status === "cancelled" ? "outline" : "default", children: o.status}, void 0, false, {fileName: _jsxFileName, lineNumber: 49}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 48}, this)
              , _jsxDEV(TableCell, { className: "text-muted-foreground", children: formatDate(o.created_at)}, void 0, false, {fileName: _jsxFileName, lineNumber: 51}, this)
              , _jsxDEV(TableCell, { className: "text-right", children: 
                _jsxDEV(Button, { asChild: true, size: "icon", variant: "ghost", 'aria-label': `View order ${shortId(o.id)}`, children: 
                  _jsxDEV(Link, { to: `/orders/${o.id}`, children: 
                    _jsxDEV(Eye, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 55}, this )
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 54}, this)
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 53}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 52}, this)
            ]}, o.id, true, {fileName: _jsxFileName, lineNumber: 44}, this)
          ))
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 42}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 31}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 30}, this)
  );
}
