const _jsxFileName = "";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/features/shared/format";






export function LowStockTable({ products }) {
  return (
    _jsxDEV(Card, { children: [
      _jsxDEV(CardHeader, { children: 
        _jsxDEV(CardTitle, { children: "Low stock products"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 22}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 21}, this)
      , _jsxDEV(CardContent, { children: 
        products.length === 0 ? (
          _jsxDEV('p', { className: "py-8 text-center text-sm text-muted-foreground"   , children: "No low stock items."   }, void 0, false, {fileName: _jsxFileName, lineNumber: 26}, this)
        ) : (
          _jsxDEV(Table, { 'aria-label': "Low stock products"  , children: [
            _jsxDEV(TableHeader, { children: 
              _jsxDEV(TableRow, { children: [
                _jsxDEV(TableHead, { children: "Name"}, void 0, false, {fileName: _jsxFileName, lineNumber: 31}, this)
                , _jsxDEV(TableHead, { children: "SKU"}, void 0, false, {fileName: _jsxFileName, lineNumber: 32}, this)
                , _jsxDEV(TableHead, { className: "text-right", children: "Price"}, void 0, false, {fileName: _jsxFileName, lineNumber: 33}, this)
                , _jsxDEV(TableHead, { className: "text-right", children: "Qty"}, void 0, false, {fileName: _jsxFileName, lineNumber: 34}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 30}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 29}, this)
            , _jsxDEV(TableBody, { children: 
              products.map((p) => (
                _jsxDEV(TableRow, { children: [
                  _jsxDEV(TableCell, { className: "font-medium", children: p.name}, void 0, false, {fileName: _jsxFileName, lineNumber: 40}, this)
                  , _jsxDEV(TableCell, { className: "font-mono text-xs" , children: p.sku}, void 0, false, {fileName: _jsxFileName, lineNumber: 41}, this)
                  , _jsxDEV(TableCell, { className: "text-right", children: formatCurrency(p.price)}, void 0, false, {fileName: _jsxFileName, lineNumber: 42}, this)
                  , _jsxDEV(TableCell, { className: "text-right", children: 
                    _jsxDEV(Badge, { variant: p.qty === 0 ? "destructive" : "secondary", children: p.qty}, void 0, false, {fileName: _jsxFileName, lineNumber: 44}, this)
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 43}, this)
                ]}, p.id, true, {fileName: _jsxFileName, lineNumber: 39}, this)
              ))
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 37}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 28}, this)
        )
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 24}, this)
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 20}, this)
  );
}
