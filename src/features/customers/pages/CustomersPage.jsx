const _jsxFileName = "";import {jsxDEV as _jsxDEV, Fragment as _Fragment} from "react/jsx-dev-runtime";import { Plus } from "lucide-react";
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
import { CustomerForm } from "@/features/customers/components/CustomerForm";
import { CustomersTable } from "@/features/customers/components/CustomersTable";
import { DeleteCustomerDialog } from "@/features/customers/components/DeleteCustomerDialog";

import {
  selectCustomersError,
  selectCustomersList,
  selectCustomersStatus,
} from "@/features/customers/store/customers-slice";
import {
  createCustomer,
  deleteCustomer,
  fetchCustomers,
} from "@/features/customers/store/customers-thunks";
import { getErrorMessage } from "@/features/shared/api-error";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

const PAGE_SIZE = 10;

export function CustomersPage() {
  const dispatch = useAppDispatch();
  const customers = useAppSelector(selectCustomersList);
  const status = useAppSelector(selectCustomersStatus);
  const error = useAppSelector(selectCustomersError);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    void dispatch(fetchCustomers());
  }, [dispatch]);
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) => c.full_name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q),
    );
  }, [customers, search]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await dispatch(createCustomer(values)).unwrap();
      toast.success("Customer created");
      setIsFormOpen(false);
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
      await dispatch(deleteCustomer(deleting.id)).unwrap();
      toast.success("Customer deleted");
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
          _jsxDEV('h1', { className: "text-2xl font-semibold tracking-tight"  , children: "Customers"}, void 0, false, {fileName: _jsxFileName, lineNumber: 89}, this)
          , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: "Contacts for placing orders."   }, void 0, false, {fileName: _jsxFileName, lineNumber: 90}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 88}, this)
        , _jsxDEV(Button, { onClick: () => setIsFormOpen(true), children: [
          _jsxDEV(Plus, { className: "mr-2 h-4 w-4"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 93}, this ), "Add customer"

        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 92}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 87}, this)
      , _jsxDEV(Input, {
        placeholder: "Search by name or email"    ,
        value: search,
        onChange: (e) => {
          setSearch(e.target.value);
          setPage(1);
        },
        'aria-label': "Search customers" ,
        className: "max-w-sm",}, void 0, false, {fileName: _jsxFileName, lineNumber: 97}, this
      )
      , status === "failed" && error ? (
        _jsxDEV(Alert, { variant: "destructive", children: [
          _jsxDEV(AlertTitle, { children: "Could not load customers"   }, void 0, false, {fileName: _jsxFileName, lineNumber: 109}, this)
          , _jsxDEV(AlertDescription, { children: error}, void 0, false, {fileName: _jsxFileName, lineNumber: 110}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 108}, this)
      ) : null
      , status === "loading" && customers.length === 0 ? (
        _jsxDEV(Skeleton, { className: "h-72 w-full" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 114}, this )
      ) : (
        _jsxDEV(_Fragment, { children: [
          _jsxDEV(CustomersTable, { customers: paged, onDelete: setDeleting,}, void 0, false, {fileName: _jsxFileName, lineNumber: 117}, this )
          , _jsxDEV('div', { className: "flex items-center justify-between text-sm text-muted-foreground"    , children: [
            _jsxDEV('span', { children: 
              filtered.length === 0
                ? "0 items"
                : `${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, filtered.length)} of ${filtered.length}`
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 119}, this)
            , _jsxDEV('div', { className: "flex gap-2" , children: [
              _jsxDEV(Button, {
                size: "sm",
                variant: "outline",
                onClick: () => setPage((p) => Math.max(1, p - 1)),
                disabled: currentPage <= 1,
 children: "Previous"

              }, void 0, false, {fileName: _jsxFileName, lineNumber: 125}, this)
              , _jsxDEV(Button, {
                size: "sm",
                variant: "outline",
                onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
                disabled: currentPage >= totalPages,
 children: "Next"

              }, void 0, false, {fileName: _jsxFileName, lineNumber: 133}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 124}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 118}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 116}, this)
      )
      , _jsxDEV(Dialog, { open: isFormOpen, onOpenChange: setIsFormOpen, children: 
        _jsxDEV(DialogContent, { className: "sm:max-w-md", children: [
          _jsxDEV(DialogHeader, { children: [
            _jsxDEV(DialogTitle, { children: "New customer" }, void 0, false, {fileName: _jsxFileName, lineNumber: 148}, this)
            , _jsxDEV(DialogDescription, { children: "Add a customer profile."   }, void 0, false, {fileName: _jsxFileName, lineNumber: 149}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 147}, this)
          , _jsxDEV(CustomerForm, {
            isSubmitting: isSubmitting,
            onSubmit: handleSubmit,
            onCancel: () => setIsFormOpen(false),}, void 0, false, {fileName: _jsxFileName, lineNumber: 151}, this
          )
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 146}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 145}, this)
      , _jsxDEV(DeleteCustomerDialog, {
        customer: deleting,
        isDeleting: isDeleting,
        onConfirm: handleConfirmDelete,
        onClose: () => setDeleting(null),}, void 0, false, {fileName: _jsxFileName, lineNumber: 158}, this
      )
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 86}, this)
  );
}
