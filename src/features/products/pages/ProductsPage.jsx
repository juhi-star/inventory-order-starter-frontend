import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteProductDialog } from "@/features/products/components/DeleteProductDialog";
import { ProductForm } from "@/features/products/components/ProductForm";
import { ProductsTable } from "@/features/products/components/ProductsTable";
import {
  selectProductsError,
  selectProductsList,
  selectProductsStatus,
} from "@/features/products/store/products-slice";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "@/features/products/store/products-thunks";
import { getErrorMessage } from "@/features/shared/api-error";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
const PAGE_SIZE = 10;
export function ProductsPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProductsList);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    void dispatch(fetchProducts());
  }, [dispatch]);
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
  }, [products, search]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const handleOpenCreate = () => {
    setEditing(null);
    setIsFormOpen(true);
  };
  const handleEdit = (product) => {
    setEditing(product);
    setIsFormOpen(true);
  };
  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      if (editing) {
        await dispatch(updateProduct({ id: editing.id, values })).unwrap();
        toast.success("Product updated");
      } else {
        await dispatch(createProduct(values)).unwrap();
        toast.success("Product created");
      }
      setIsFormOpen(false);
      setEditing(null);
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleConfirmDelete = async () => {
    if (!deleting) return;
    setIsDeleting(true);
    try {
      await dispatch(deleteProduct(deleting.id)).unwrap();
      toast.success("Product deleted");
      setDeleting(null);
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1><p className="text-sm text-muted-foreground">Manage inventory and pricing.</p></div><Button onClick={handleOpenCreate}>
          <Plus className="mr-2 h-4 w-4" /> Add product</Button></header><Input placeholder="Search by name or SKU" value={search} onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }} aria-label="Search products" className="max-w-sm" />{status === "failed" && error ? (
        <Alert variant="destructive">
          <AlertTitle>Could not load products</AlertTitle><AlertDescription>error</AlertDescription></Alert>
      ) : null}
{status === "loading" && products.length === 0 ? (
        <Skeleton className="h-72 w-full" />
      ) : (
        <>
          <ProductsTable products={paged} onEdit={handleEdit} onDelete={setDeleting} /><div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{filtered.length === 0
                ? "0 items"
                : `${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, filtered.length)} of ${filtered.length}`}</span><div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage <= 1}>Previous</Button><Button size="sm" variant="outline" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage >= totalPages}>Next</Button></div></div></>
      )}
<Dialog open={isFormOpen} onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditing(null);
        }}><DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit product" : "New product"}</DialogTitle><DialogDescription>{editing ? "Update product details." : "Add a product to inventory."}</DialogDescription></DialogHeader><ProductForm initial={editing ?? undefined} isSubmitting={isSubmitting} onSubmit={handleSubmit} onCancel={() => {
              setIsFormOpen(false);
              setEditing(null);
            }} /></DialogContent></Dialog><DeleteProductDialog product={deleting} isDeleting={isDeleting} onConfirm={handleConfirmDelete} onClose={() => setDeleting(null)} /></section>
  );
}
