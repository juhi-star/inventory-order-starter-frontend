const _jsxFileName = "";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { ArrowLeft } from "lucide-react";
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
import {
  getErrorMessage,
  getOversellDetails,
  isApiError,
} from "@/features/shared/api-error";
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
  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setOversellErrors([]);
    try {
      const order = await dispatch(createOrder(values)).unwrap();
      toast.success("Order placed");
      navigate(`/orders/${order.id}`);
    } catch (e) {
      if (isApiError(e) && e.code === "oversell") {
        const details = getOversellDetails(e);
        setOversellErrors(
          details.map((d) => ({
            index: d.line,
            message: `Requested ${d.requested}, only ${d.available} available`,
          })),
        );
        return;
      }
      toast.error(getErrorMessage(e));
    } finally {
      setIsSubmitting(false);
    }
  };
  const isLoading = customers.length === 0 || products.length === 0;
  return (
    _jsxDEV('section', { className: "flex flex-col gap-6"  , children: [
      _jsxDEV('header', { className: "flex flex-col gap-2"  , children: [
        _jsxDEV(Button, { asChild: true, variant: "ghost", size: "sm", className: "w-fit -ml-2" , children: 
          _jsxDEV(Link, { to: "/orders", children: [
            _jsxDEV(ArrowLeft, { className: "mr-1 h-4 w-4"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 62}, this ), "Back to orders"

          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 61}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 60}, this)
        , _jsxDEV('h1', { className: "text-2xl font-semibold tracking-tight"  , children: "New order" }, void 0, false, {fileName: _jsxFileName, lineNumber: 66}, this)
        , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: "Pick a customer and add line items."      }, void 0, false, {fileName: _jsxFileName, lineNumber: 67}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 59}, this)
      , oversellErrors.length > 0 ? (
        _jsxDEV('div', { className: "rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive"      , children: [
          _jsxDEV('p', { className: "font-semibold", children: "Insufficient stock" }, void 0, false, {fileName: _jsxFileName, lineNumber: 71}, this)
          , _jsxDEV('ul', { className: "mt-2 list-disc pl-5"  , children: 
            oversellErrors.map((err) => (
              _jsxDEV('li', { children: ["Line "
                 , err.index + 1, ": " , err.message
              ]}, err.index, true, {fileName: _jsxFileName, lineNumber: 74}, this)
            ))
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 72}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 70}, this)
      ) : null
      , isLoading ? (
        _jsxDEV(Skeleton, { className: "h-96 w-full" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 82}, this )
      ) : (
        _jsxDEV(OrderCreateForm, {
          customers: customers,
          products: products,
          isSubmitting: isSubmitting,
          onSubmit: handleSubmit,}, void 0, false, {fileName: _jsxFileName, lineNumber: 84}, this
        )
      )
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 58}, this)
  );
}
