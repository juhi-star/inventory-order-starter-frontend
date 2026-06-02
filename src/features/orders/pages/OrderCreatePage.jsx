import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { selectCustomersList } from "@/features/customers/store/customers-slice";
import { fetchCustomers } from "@/features/customers/store/customers-thunks";
import { OrderCreateForm } from "@/features/orders/components/OrderCreateForm";
import { createOrder } from "@/features/orders/store/orders-thunks";
import { selectProductsList } from "@/features/products/store/products-slice";
import { fetchProducts } from "@/features/products/store/products-thunks";
import { getErrorMessage, getOversellDetails, isApiError } from "@/features/shared/api-error";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
export function OrderCreatePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const customers = useAppSelector(selectCustomersList);
  const products = useAppSelector(selectProductsList);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [oversellErrors, setOversellErrors] = useState([]);
  useEffect(() => {
    void dispatch(fetchCustomers());
    void dispatch(fetchProducts());
  }, [dispatch]);
  const handleSubmit = async values => {
    setIsSubmitting(true);
    setOversellErrors([]);
    try {
      const order = await dispatch(createOrder(values)).unwrap();
      toast.success("Order placed");
      navigate(`/orders/${order.id}`);
    } catch (e) {
      if (isApiError(e) && e.code === "oversell") {
        const details = getOversellDetails(e);
        setOversellErrors(details.map(d => ({
          index: d.line,
          message: `Requested ${d.requested}, only ${d.available} available`
        })));
        return;
      }
      toast.error(getErrorMessage(e));
    } finally {
      setIsSubmitting(false);
    }
  };
  const isLoading = customers.length === 0 || products.length === 0;
  return <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <Button asChild={true} variant="ghost" size="sm" className="w-fit -ml-2"><Link to="/orders">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to orders</Link></Button><h1 className="text-2xl font-semibold tracking-tight">New order</h1><p className="text-sm text-muted-foreground">Pick a customer and add line items.</p></header>{oversellErrors.length > 0 ? (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          <p className="font-semibold">Insufficient stock</p><ul className="mt-2 list-disc pl-5">{oversellErrors.map((err) => (
              <li key={err.index}>
Line {err.index + 1}: {err.message}</li>
            ))}</ul></div>
      ) : null}
{isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : (
        <OrderCreateForm customers={customers} products={products} isSubmitting={isSubmitting} onSubmit={handleSubmit} />
      )}</section>;
}