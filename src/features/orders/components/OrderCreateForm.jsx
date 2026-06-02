const _jsxFileName = "";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime"; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { orderFormSchema, } from "@/features/orders/schemas/order";
import { formatCurrency } from "@/features/shared/format";









export function OrderCreateForm({ customers, products, isSubmitting, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(orderFormSchema),
    defaultValues: { customer_id: "", lines: [{ product_id: "", qty: 1 }] },
  });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "lines" });
  const watchedLines = useWatch({ control: form.control, name: "lines" });
  const total = (_nullishCoalesce(watchedLines, () => ( []))).reduce((sum, l) => {
    const product = products.find((p) => p.id === _optionalChain([l, 'optionalAccess', _ => _.product_id]));
    if (!product) return sum;
    const qty = Number(_optionalChain([l, 'optionalAccess', _2 => _2.qty])) || 0;
    return sum + product.price * qty;
  }, 0);
  return (
    _jsxDEV(Form, { ...form, children: 
      _jsxDEV('form', { onSubmit: form.handleSubmit(onSubmit), className: "flex flex-col gap-6"  , children: [
        _jsxDEV(FormField, {
          control: form.control,
          name: "customer_id",
          render: ({ field }) => (
            _jsxDEV(FormItem, { children: [
              _jsxDEV(FormLabel, { children: "Customer"}, void 0, false, {fileName: _jsxFileName, lineNumber: 55}, this)
              , _jsxDEV(Select, { onValueChange: field.onChange, value: field.value, children: [
                _jsxDEV(FormControl, { children: 
                  _jsxDEV(SelectTrigger, { children: 
                    _jsxDEV(SelectValue, { placeholder: "Pick a customer"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 59}, this )
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 58}, this)
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 57}, this)
                , _jsxDEV(SelectContent, { children: 
                  customers.map((c) => (
                    _jsxDEV(SelectItem, { value: c.id, children: [
                      c.full_name, " (" , c.email, ")"
                    ]}, c.id, true, {fileName: _jsxFileName, lineNumber: 64}, this)
                  ))
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 62}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 56}, this)
              , _jsxDEV(FormMessage, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 70}, this )
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 54}, this)
          ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 50}, this
        )
        , _jsxDEV('div', { className: "flex flex-col gap-3"  , children: [
          _jsxDEV('div', { className: "flex items-center justify-between"  , children: [
            _jsxDEV('h2', { className: "text-sm font-semibold" , children: "Line items" }, void 0, false, {fileName: _jsxFileName, lineNumber: 76}, this)
            , _jsxDEV(Button, {
              type: "button",
              size: "sm",
              variant: "outline",
              onClick: () => append({ product_id: "", qty: 1 }),
 children: [
              _jsxDEV(Plus, { className: "mr-1 h-4 w-4"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 83}, this ), " Add line"
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 77}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 75}, this)
          , _optionalChain([form, 'access', _3 => _3.formState, 'access', _4 => _4.errors, 'access', _5 => _5.lines, 'optionalAccess', _6 => _6.root]) ? (
            _jsxDEV('p', { className: "text-sm text-destructive" , children: form.formState.errors.lines.root.message}, void 0, false, {fileName: _jsxFileName, lineNumber: 87}, this)
          ) : null
          , fields.map((fieldRow, index) => (
            _jsxDEV('div', {

              className: "grid grid-cols-1 gap-3 rounded-md border border-border p-3 sm:grid-cols-[1fr,120px,40px]"       ,
 children: [
              _jsxDEV(FormField, {
                control: form.control,
                name: `lines.${index}.product_id` ,
                render: ({ field }) => (
                  _jsxDEV(FormItem, { children: [
                    _jsxDEV(FormLabel, { children: "Product"}, void 0, false, {fileName: _jsxFileName, lineNumber: 99}, this)
                    , _jsxDEV(Select, { onValueChange: field.onChange, value: field.value, children: [
                      _jsxDEV(FormControl, { children: 
                        _jsxDEV(SelectTrigger, { children: 
                          _jsxDEV(SelectValue, { placeholder: "Pick product" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 103}, this )
                        }, void 0, false, {fileName: _jsxFileName, lineNumber: 102}, this)
                      }, void 0, false, {fileName: _jsxFileName, lineNumber: 101}, this)
                      , _jsxDEV(SelectContent, { children: 
                        products.map((p) => (
                          _jsxDEV(SelectItem, { value: p.id, children: [
                            p.name, " \\u2014 "  , formatCurrency(p.price), " (qty "  , p.qty, ")"
                          ]}, p.id, true, {fileName: _jsxFileName, lineNumber: 108}, this)
                        ))
                      }, void 0, false, {fileName: _jsxFileName, lineNumber: 106}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 100}, this)
                    , _jsxDEV(FormMessage, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 114}, this )
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 98}, this)
                ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 94}, this
              )
              , _jsxDEV(FormField, {
                control: form.control,
                name: `lines.${index}.qty` ,
                render: ({ field }) => (
                  _jsxDEV(FormItem, { children: [
                    _jsxDEV(FormLabel, { children: "Qty"}, void 0, false, {fileName: _jsxFileName, lineNumber: 123}, this)
                    , _jsxDEV(FormControl, { children: 
                      _jsxDEV(Input, { type: "number", step: "1", min: "1", ...field,}, void 0, false, {fileName: _jsxFileName, lineNumber: 125}, this )
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 124}, this)
                    , _jsxDEV(FormMessage, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 127}, this )
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 122}, this)
                ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 118}, this
              )
              , _jsxDEV('div', { className: "flex items-end" , children: 
                _jsxDEV(Button, {
                  type: "button",
                  size: "icon",
                  variant: "ghost",
                  'aria-label': `Remove line ${index + 1}`,
                  onClick: () => remove(index),
                  disabled: fields.length <= 1,
 children: 
                  _jsxDEV(Trash2, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 140}, this )
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 132}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 131}, this)
            ]}, fieldRow.id, true, {fileName: _jsxFileName, lineNumber: 90}, this)
          ))
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 74}, this)
        , _jsxDEV(Separator, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 146}, this )
        , _jsxDEV('div', { className: "flex items-center justify-between"  , children: [
          _jsxDEV('span', { className: "text-sm text-muted-foreground" , children: "Total"}, void 0, false, {fileName: _jsxFileName, lineNumber: 148}, this)
          , _jsxDEV('span', { className: "text-xl font-semibold" , children: formatCurrency(total)}, void 0, false, {fileName: _jsxFileName, lineNumber: 149}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 147}, this)
        , _jsxDEV('div', { className: "flex justify-end" , children: 
          _jsxDEV(Button, { type: "submit", disabled: isSubmitting, children: 
            isSubmitting ? "Placing..." : "Place order"
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 152}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 151}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 49}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 48}, this)
  );
}
