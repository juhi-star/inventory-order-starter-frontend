import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { CustomerForm } from "@/features/customers/components/CustomerForm";
import { CustomersTable } from "@/features/customers/components/CustomersTable";
import { DeleteCustomerDialog } from "@/features/customers/components/DeleteCustomerDialog";
import { selectCustomersError, selectCustomersList, selectCustomersStatus } from "@/features/customers/store/customers-slice";
import { createCustomer, deleteCustomer, fetchCustomers } from "@/features/customers/store/customers-thunks";
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
    return customers.filter(c => c.full_name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
  }, [customers, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSubmit = async values => {
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
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Customers</h1>
          <p className="text-sm text-muted-foreground">Contacts for placing orders.</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add customer
        </Button>
      </header>

      <Input
        placeholder="Search by name or email"
        value={search}
        onChange={e => { setSearch(e.target.value); setPage(1); }}
        aria-label="Search customers"
        className="max-w-sm"
      />

      {status === "failed" && error ? (
        <Alert variant="destructive">
          <AlertTitle>Could not load customers</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {status === "loading" && customers.length === 0 ? (
        <Skeleton className="h-72 w-full" />
      ) : (
        <>
          <CustomersTable customers={paged} onDelete={setDeleting} />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {filtered.length === 0
                ? "0 items"
                : `${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={currentPage <= 1}>Previous</Button>
              <Button size="sm" variant="outline" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={currentPage >= totalPages}>Next</Button>
            </div>
          </div>
        </>
      )}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New customer</DialogTitle>
            <DialogDescription>Add a customer profile.</DialogDescription>
          </DialogHeader>
          <CustomerForm isSubmitting={isSubmitting} onSubmit={handleSubmit} onCancel={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>

      <DeleteCustomerDialog customer={deleting} isDeleting={isDeleting} onConfirm={handleConfirmDelete} onClose={() => setDeleting(null)} />
    </section>
  );
}
