const _jsxFileName = "";import {jsxDEV as _jsxDEV, Fragment as _Fragment} from "react/jsx-dev-runtime"; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }import { Plus } from "lucide-react";
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
    _jsxDEV('section', { className: "flex flex-col gap-6"  , children: [
      _jsxDEV('header', { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"     , children: [
        _jsxDEV('div', { children: [
          _jsxDEV('h1', { className: "text-2xl font-semibold tracking-tight"  , children: "Products"}, void 0, false, {fileName: _jsxFileName, lineNumber: 103}, this)
          , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: "Manage inventory and pricing."   }, void 0, false, {fileName: _jsxFileName, lineNumber: 104}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 102}, this)
        , _jsxDEV(Button, { onClick: handleOpenCreate, children: [
          _jsxDEV(Plus, { className: "mr-2 h-4 w-4"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 107}, this ), "Add product"

        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 106}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 101}, this)
      , _jsxDEV(Input, {
        placeholder: "Search by name or SKU"    ,
        value: search,
        onChange: (e) => {
          setSearch(e.target.value);
          setPage(1);
        },
        'aria-label': "Search products" ,
        className: "max-w-sm",}, void 0, false, {fileName: _jsxFileName, lineNumber: 111}, this
      )
      , status === "failed" && error ? (
        _jsxDEV(Alert, { variant: "destructive", children: [
          _jsxDEV(AlertTitle, { children: "Could not load products"   }, void 0, false, {fileName: _jsxFileName, lineNumber: 123}, this)
          , _jsxDEV(AlertDescription, { children: error}, void 0, false, {fileName: _jsxFileName, lineNumber: 124}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 122}, this)
      ) : null
      , status === "loading" && products.length === 0 ? (
        _jsxDEV(Skeleton, { className: "h-72 w-full" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 128}, this )
      ) : (
        _jsxDEV(_Fragment, { children: [
          _jsxDEV(ProductsTable, { products: paged, onEdit: handleEdit, onDelete: setDeleting,}, void 0, false, {fileName: _jsxFileName, lineNumber: 131}, this )
          , _jsxDEV('div', { className: "flex items-center justify-between text-sm text-muted-foreground"    , children: [
            _jsxDEV('span', { children: 
              filtered.length === 0
                ? "0 items"
                : `${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, filtered.length)} of ${filtered.length}`
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 133}, this)
            , _jsxDEV('div', { className: "flex gap-2" , children: [
              _jsxDEV(Button, {
                size: "sm",
                variant: "outline",
                onClick: () => setPage((p) => Math.max(1, p - 1)),
                disabled: currentPage <= 1,
 children: "Previous"

              }, void 0, false, {fileName: _jsxFileName, lineNumber: 139}, this)
              , _jsxDEV(Button, {
                size: "sm",
                variant: "outline",
                onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
                disabled: currentPage >= totalPages,
 children: "Next"

              }, void 0, false, {fileName: _jsxFileName, lineNumber: 147}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 138}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 132}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 130}, this)
      )
      , _jsxDEV(Dialog, {
        open: isFormOpen,
        onOpenChange: (open) => {
          setIsFormOpen(open);
          if (!open) setEditing(null);
        },
 children: 
        _jsxDEV(DialogContent, { className: "sm:max-w-md", children: [
          _jsxDEV(DialogHeader, { children: [
            _jsxDEV(DialogTitle, { children: editing ? "Edit product" : "New product"}, void 0, false, {fileName: _jsxFileName, lineNumber: 168}, this)
            , _jsxDEV(DialogDescription, { children: 
              editing ? "Update product details." : "Add a product to inventory."
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 169}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 167}, this)
          , _jsxDEV(ProductForm, {
            initial: _nullishCoalesce(editing, () => ( undefined)),
            isSubmitting: isSubmitting,
            onSubmit: handleSubmit,
            onCancel: () => {
              setIsFormOpen(false);
              setEditing(null);
            },}, void 0, false, {fileName: _jsxFileName, lineNumber: 173}, this
          )
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 166}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 159}, this)
      , _jsxDEV(DeleteProductDialog, {
        product: deleting,
        isDeleting: isDeleting,
        onConfirm: handleConfirmDelete,
        onClose: () => setDeleting(null),}, void 0, false, {fileName: _jsxFileName, lineNumber: 184}, this
      )
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 100}, this)
  );
}
