const _jsxFileName = "";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";







export function CustomersTable({ customers, onDelete }) {
  if (customers.length === 0) {
    return (
      _jsxDEV('div', { className: "rounded-md border border-dashed border-border py-12 text-center text-sm text-muted-foreground"       , children: "No customers match your search."

      }, void 0, false, {fileName: _jsxFileName, lineNumber: 22}, this)
    );
  }
  return (
    _jsxDEV('div', { className: "rounded-md border border-border"  , children: 
      _jsxDEV(Table, { 'aria-label': "Customers", children: [
        _jsxDEV(TableHeader, { children: 
          _jsxDEV(TableRow, { children: [
            _jsxDEV(TableHead, { children: "Name"}, void 0, false, {fileName: _jsxFileName, lineNumber: 32}, this)
            , _jsxDEV(TableHead, { children: "Email"}, void 0, false, {fileName: _jsxFileName, lineNumber: 33}, this)
            , _jsxDEV(TableHead, { children: "Phone"}, void 0, false, {fileName: _jsxFileName, lineNumber: 34}, this)
            , _jsxDEV(TableHead, { className: "w-24 text-right" , children: "Actions"}, void 0, false, {fileName: _jsxFileName, lineNumber: 35}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 31}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 30}, this)
        , _jsxDEV(TableBody, { children: 
          customers.map((c) => (
            _jsxDEV(TableRow, { children: [
              _jsxDEV(TableCell, { className: "font-medium", children: c.full_name}, void 0, false, {fileName: _jsxFileName, lineNumber: 41}, this)
              , _jsxDEV(TableCell, { children: c.email}, void 0, false, {fileName: _jsxFileName, lineNumber: 42}, this)
              , _jsxDEV(TableCell, { className: "font-mono text-xs" , children: c.phone}, void 0, false, {fileName: _jsxFileName, lineNumber: 43}, this)
              , _jsxDEV(TableCell, { className: "text-right", children: 
                _jsxDEV(Button, {
                  size: "icon",
                  variant: "ghost",
                  'aria-label': `Delete ${c.full_name}`,
                  onClick: () => onDelete(c),
 children: 
                  _jsxDEV(Trash2, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 51}, this )
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 45}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 44}, this)
            ]}, c.id, true, {fileName: _jsxFileName, lineNumber: 40}, this)
          ))
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 38}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 29}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 28}, this)
  );
}
