const _jsxFileName = "";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    _jsxDEV('section', { className: "flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center"      , children: [
      _jsxDEV('h1', { className: "text-3xl font-semibold tracking-tight"  , children: "Page not found"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 8}, this)
      , _jsxDEV('p', { className: "text-muted-foreground", children: "The page you’re looking for doesn’t exist."      }, void 0, false, {fileName: _jsxFileName, lineNumber: 9}, this)
      , _jsxDEV(Button, { asChild: true, children: 
        _jsxDEV(Link, { to: "/", children: "Back to dashboard"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 11}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 10}, this)
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 7}, this)
  );
}
