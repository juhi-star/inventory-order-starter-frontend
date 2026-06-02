const _jsxFileName = "";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";








export function CancelOrderDialog({ isOpen, isCancelling, onConfirm, onClose }) {
  return (
    _jsxDEV(Dialog, { open: isOpen, onOpenChange: (open) => (!open ? onClose() : null), children: 
      _jsxDEV(DialogContent, { className: "sm:max-w-sm", children: [
        _jsxDEV(DialogHeader, { children: [
          _jsxDEV(DialogTitle, { children: "Cancel order?" }, void 0, false, {fileName: _jsxFileName, lineNumber: 23}, this)
          , _jsxDEV(DialogDescription, { children: "Stock will be restored to inventory."     }, void 0, false, {fileName: _jsxFileName, lineNumber: 24}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 22}, this)
        , _jsxDEV(DialogFooter, { children: [
          _jsxDEV(Button, { variant: "outline", onClick: onClose, disabled: isCancelling, children: "Keep order"

          }, void 0, false, {fileName: _jsxFileName, lineNumber: 27}, this)
          , _jsxDEV(Button, { variant: "destructive", onClick: onConfirm, disabled: isCancelling, children: 
            isCancelling ? "Cancelling..." : "Cancel order"
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 30}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 26}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 21}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 20}, this)
  );
}
