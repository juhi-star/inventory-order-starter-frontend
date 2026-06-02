import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
export function CancelOrderDialog({
  isOpen,
  isCancelling,
  onConfirm,
  onClose
}) {
  return <Dialog open={isOpen} onOpenChange={open => !open ? onClose() : null}><DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Cancel order?</DialogTitle><DialogDescription>Stock will be restored to inventory.</DialogDescription></DialogHeader><DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isCancelling}>Keep order</Button><Button variant="destructive" onClick={onConfirm} disabled={isCancelling}>{isCancelling ? "Cancelling..." : "Cancel order"}</Button></DialogFooter></DialogContent></Dialog>;
}