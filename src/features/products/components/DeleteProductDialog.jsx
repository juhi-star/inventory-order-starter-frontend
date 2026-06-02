import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
export function DeleteProductDialog({
  product,
  isDeleting,
  onConfirm,
  onClose
}) {
  return <Dialog open={product !== null} onOpenChange={open => !open ? onClose() : null}><DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete product?</DialogTitle><DialogDescription>{product ? `"${product.name}" (${product.sku}) will be removed.` : ""}</DialogDescription></DialogHeader><DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>Cancel</Button>
<Button variant="destructive" onClick={onConfirm} disabled={isDeleting}>{isDeleting ? "Deleting..." : "Delete"}</Button></DialogFooter></DialogContent></Dialog>;
}