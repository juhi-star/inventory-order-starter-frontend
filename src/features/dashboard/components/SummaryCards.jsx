const _jsxFileName = "";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { Boxes, Receipt, TriangleAlert, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";








const CARD_STYLE = "shadow-sm";

export function SummaryCards(props) {
  return (
    _jsxDEV('div', { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"    , children: [
      _jsxDEV(Card, { className: CARD_STYLE, children: [
        _jsxDEV(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2"     , children: [
          _jsxDEV(CardTitle, { className: "text-sm font-medium" , children: "Total products" }, void 0, false, {fileName: _jsxFileName, lineNumber: 19}, this)
          , _jsxDEV(Boxes, { className: "h-4 w-4 text-muted-foreground"  , 'aria-hidden': true,}, void 0, false, {fileName: _jsxFileName, lineNumber: 20}, this )
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 18}, this)
        , _jsxDEV(CardContent, { children: 
          _jsxDEV('div', { className: "text-2xl font-semibold" , children: props.totalProducts}, void 0, false, {fileName: _jsxFileName, lineNumber: 23}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 22}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 17}, this)
      , _jsxDEV(Card, { className: CARD_STYLE, children: [
        _jsxDEV(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2"     , children: [
          _jsxDEV(CardTitle, { className: "text-sm font-medium" , children: "Total customers" }, void 0, false, {fileName: _jsxFileName, lineNumber: 28}, this)
          , _jsxDEV(Users, { className: "h-4 w-4 text-muted-foreground"  , 'aria-hidden': true,}, void 0, false, {fileName: _jsxFileName, lineNumber: 29}, this )
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 27}, this)
        , _jsxDEV(CardContent, { children: 
          _jsxDEV('div', { className: "text-2xl font-semibold" , children: props.totalCustomers}, void 0, false, {fileName: _jsxFileName, lineNumber: 32}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 31}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 26}, this)
      , _jsxDEV(Card, { className: CARD_STYLE, children: [
        _jsxDEV(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2"     , children: [
          _jsxDEV(CardTitle, { className: "text-sm font-medium" , children: "Total orders" }, void 0, false, {fileName: _jsxFileName, lineNumber: 37}, this)
          , _jsxDEV(Receipt, { className: "h-4 w-4 text-muted-foreground"  , 'aria-hidden': true,}, void 0, false, {fileName: _jsxFileName, lineNumber: 38}, this )
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 36}, this)
        , _jsxDEV(CardContent, { children: 
          _jsxDEV('div', { className: "text-2xl font-semibold" , children: props.totalOrders}, void 0, false, {fileName: _jsxFileName, lineNumber: 41}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 40}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 35}, this)
      , _jsxDEV(Card, { className: CARD_STYLE, children: [
        _jsxDEV(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2"     , children: [
          _jsxDEV(CardTitle, { className: "text-sm font-medium" , children: "Low stock" }, void 0, false, {fileName: _jsxFileName, lineNumber: 46}, this)
          , _jsxDEV(TriangleAlert, { className: "h-4 w-4 text-amber-500"  , 'aria-hidden': true,}, void 0, false, {fileName: _jsxFileName, lineNumber: 47}, this )
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 45}, this)
        , _jsxDEV(CardContent, { children: 
          _jsxDEV('div', { className: "text-2xl font-semibold" , children: props.lowStockCount}, void 0, false, {fileName: _jsxFileName, lineNumber: 50}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 49}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 44}, this)
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 16}, this)
  );
}
