const _jsxFileName = "";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  productFormSchema,

} from "@/features/products/schemas/product";









const EMPTY_DEFAULTS = { name: "", sku: "", price: 0, qty: 0 };

export function ProductForm({ initial, isSubmitting, onSubmit, onCancel }) {
  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: initial
      ? { name: initial.name, sku: initial.sku, price: initial.price, qty: initial.qty }
      : EMPTY_DEFAULTS,
  });
  useEffect(() => {
    if (initial) form.reset({ name: initial.name, sku: initial.sku, price: initial.price, qty: initial.qty });
    else form.reset(EMPTY_DEFAULTS);
  }, [initial, form]);
  return (
    _jsxDEV(Form, { ...form, children: 
      _jsxDEV('form', { onSubmit: form.handleSubmit(onSubmit), className: "flex flex-col gap-4"  , children: [
        _jsxDEV(FormField, {
          control: form.control,
          name: "name",
          render: ({ field }) => (
            _jsxDEV(FormItem, { children: [
              _jsxDEV(FormLabel, { children: "Name"}, void 0, false, {fileName: _jsxFileName, lineNumber: 49}, this)
              , _jsxDEV(FormControl, { children: 
                _jsxDEV(Input, { placeholder: "Wireless Mouse" , ...field,}, void 0, false, {fileName: _jsxFileName, lineNumber: 51}, this )
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 50}, this)
              , _jsxDEV(FormMessage, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 53}, this )
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 48}, this)
          ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 44}, this
        )
        , _jsxDEV(FormField, {
          control: form.control,
          name: "sku",
          render: ({ field }) => (
            _jsxDEV(FormItem, { children: [
              _jsxDEV(FormLabel, { children: "SKU"}, void 0, false, {fileName: _jsxFileName, lineNumber: 62}, this)
              , _jsxDEV(FormControl, { children: 
                _jsxDEV(Input, { placeholder: "WM-001", className: "font-mono", ...field,}, void 0, false, {fileName: _jsxFileName, lineNumber: 64}, this )
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 63}, this)
              , _jsxDEV(FormMessage, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 66}, this )
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 61}, this)
          ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 57}, this
        )
        , _jsxDEV('div', { className: "grid grid-cols-2 gap-4"  , children: [
          _jsxDEV(FormField, {
            control: form.control,
            name: "price",
            render: ({ field }) => (
              _jsxDEV(FormItem, { children: [
                _jsxDEV(FormLabel, { children: "Price (USD)" }, void 0, false, {fileName: _jsxFileName, lineNumber: 76}, this)
                , _jsxDEV(FormControl, { children: 
                  _jsxDEV(Input, { type: "number", step: "0.01", min: "0", ...field,}, void 0, false, {fileName: _jsxFileName, lineNumber: 78}, this )
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 77}, this)
                , _jsxDEV(FormMessage, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 80}, this )
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 75}, this)
            ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 71}, this
          )
          , _jsxDEV(FormField, {
            control: form.control,
            name: "qty",
            render: ({ field }) => (
              _jsxDEV(FormItem, { children: [
                _jsxDEV(FormLabel, { children: "Quantity"}, void 0, false, {fileName: _jsxFileName, lineNumber: 89}, this)
                , _jsxDEV(FormControl, { children: 
                  _jsxDEV(Input, { type: "number", step: "1", min: "0", ...field,}, void 0, false, {fileName: _jsxFileName, lineNumber: 91}, this )
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 90}, this)
                , _jsxDEV(FormMessage, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 93}, this )
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 88}, this)
            ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 84}, this
          )
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 70}, this)
        , _jsxDEV('div', { className: "flex justify-end gap-2 pt-2"   , children: [
          _jsxDEV(Button, { type: "button", variant: "outline", onClick: onCancel, disabled: isSubmitting, children: "Cancel"

          }, void 0, false, {fileName: _jsxFileName, lineNumber: 99}, this)
          , _jsxDEV(Button, { type: "submit", disabled: isSubmitting, children: 
            isSubmitting ? "Saving..." : initial ? "Save changes" : "Create"
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 102}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 98}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 43}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 42}, this)
  );
}
