import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
export function DeleteCustomerDialog({
  customer,
  isDeleting,
  onConfirm,
  onClose
}) {
  return <Dialog open={customer !== null} onOpenChange={open => !open ? onClose() : null}><DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete customer?</DialogTitle><DialogDescription>{customer ? `"${customer.full_name}" (${customer.email}) will be removed.` : ""}</DialogDescription></DialogHeader><DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>Cancel</Button>
<Button variant="destructive" onClick={onConfirm} disabled={isDeleting}>{isDeleting ? "Deleting..." : "Delete"}</Button></DialogFooter></DialogContent></Dialog>;
}