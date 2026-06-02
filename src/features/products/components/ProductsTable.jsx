const _jsxFileName = "";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { Pencil, Trash2 } from "lucide-react";

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
      _jsxDEV('div', { className: "rounded-md border border-dashed border-border py-12 text-center text-sm text-muted-foreground"       , children: "No products match your search."

      }, void 0, false, {fileName: _jsxFileName, lineNumber: 27}, this)
    );
  }
  return (
    _jsxDEV('div', { className: "rounded-md border border-border"  , children: 
      _jsxDEV(Table, { 'aria-label': "Products", children: [
        _jsxDEV(TableHeader, { children: 
          _jsxDEV(TableRow, { children: [
            _jsxDEV(TableHead, { children: "Name"}, void 0, false, {fileName: _jsxFileName, lineNumber: 37}, this)
            , _jsxDEV(TableHead, { children: "SKU"}, void 0, false, {fileName: _jsxFileName, lineNumber: 38}, this)
            , _jsxDEV(TableHead, { className: "text-right", children: "Price"}, void 0, false, {fileName: _jsxFileName, lineNumber: 39}, this)
            , _jsxDEV(TableHead, { className: "text-right", children: "Qty"}, void 0, false, {fileName: _jsxFileName, lineNumber: 40}, this)
            , _jsxDEV(TableHead, { className: "w-32 text-right" , children: "Actions"}, void 0, false, {fileName: _jsxFileName, lineNumber: 41}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 36}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 35}, this)
        , _jsxDEV(TableBody, { children: 
          products.map((p) => (
            _jsxDEV(TableRow, { children: [
              _jsxDEV(TableCell, { className: "font-medium", children: p.name}, void 0, false, {fileName: _jsxFileName, lineNumber: 47}, this)
              , _jsxDEV(TableCell, { className: "font-mono text-xs" , children: p.sku}, void 0, false, {fileName: _jsxFileName, lineNumber: 48}, this)
              , _jsxDEV(TableCell, { className: "text-right", children: formatCurrency(p.price)}, void 0, false, {fileName: _jsxFileName, lineNumber: 49}, this)
              , _jsxDEV(TableCell, { className: "text-right", children: 
                p.qty <= LOW_STOCK_THRESHOLD ? (
                  _jsxDEV(Badge, { variant: p.qty === 0 ? "destructive" : "secondary", children: [p.qty, " low" ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 52}, this)
                ) : (
                  _jsxDEV('span', { children: p.qty}, void 0, false, {fileName: _jsxFileName, lineNumber: 54}, this)
                )
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 50}, this)
              , _jsxDEV(TableCell, { className: "text-right", children: 
                _jsxDEV('div', { className: "flex justify-end gap-1"  , children: [
                  _jsxDEV(Button, {
                    size: "icon",
                    variant: "ghost",
                    'aria-label': `Edit ${p.name}`,
                    onClick: () => onEdit(p),
 children: 
                    _jsxDEV(Pencil, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 65}, this )
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 59}, this)
                  , _jsxDEV(Button, {
                    size: "icon",
                    variant: "ghost",
                    'aria-label': `Delete ${p.name}`,
                    onClick: () => onDelete(p),
 children: 
                    _jsxDEV(Trash2, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 73}, this )
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 67}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 58}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 57}, this)
            ]}, p.id, true, {fileName: _jsxFileName, lineNumber: 46}, this)
          ))
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 44}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 34}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 33}, this)
  );
}
