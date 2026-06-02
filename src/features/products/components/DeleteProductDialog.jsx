const _jsxFileName = "";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";









export function DeleteProductDialog({ product, isDeleting, onConfirm, onClose }) {
  return (
    _jsxDEV(Dialog, { open: product !== null, onOpenChange: (open) => (!open ? onClose() : null), children: 
      _jsxDEV(DialogContent, { className: "sm:max-w-sm", children: [
        _jsxDEV(DialogHeader, { children: [
          _jsxDEV(DialogTitle, { children: "Delete product?" }, void 0, false, {fileName: _jsxFileName, lineNumber: 24}, this)
          , _jsxDEV(DialogDescription, { children: 
            product ? `"${product.name}" (${product.sku}) will be removed.` : ""
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 25}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 23}, this)
        , _jsxDEV(DialogFooter, { children: [
          _jsxDEV(Button, { variant: "outline", onClick: onClose, disabled: isDeleting, children: "Cancel"

          }, void 0, false, {fileName: _jsxFileName, lineNumber: 30}, this)
          , _jsxDEV(Button, { variant: "destructive", onClick: onConfirm, disabled: isDeleting, children: 
            isDeleting ? "Deleting..." : "Delete"
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 33}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 29}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 22}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 21}, this)
  );
}
