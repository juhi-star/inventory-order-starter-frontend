const _jsxFileName = "";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { zodResolver } from "@hookform/resolvers/zod";
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
  customerFormSchema,

} from "@/features/customers/schemas/customer";







const EMPTY_DEFAULTS = { full_name: "", email: "", phone: "" };

export function CustomerForm({ isSubmitting, onSubmit, onCancel }) {
  const form = useForm({
    resolver: zodResolver(customerFormSchema),
    defaultValues: EMPTY_DEFAULTS,
  });
  return (
    _jsxDEV(Form, { ...form, children: 
      _jsxDEV('form', { onSubmit: form.handleSubmit(onSubmit), className: "flex flex-col gap-4"  , children: [
        _jsxDEV(FormField, {
          control: form.control,
          name: "full_name",
          render: ({ field }) => (
            _jsxDEV(FormItem, { children: [
              _jsxDEV(FormLabel, { children: "Full name" }, void 0, false, {fileName: _jsxFileName, lineNumber: 40}, this)
              , _jsxDEV(FormControl, { children: 
                _jsxDEV(Input, { placeholder: "Alice Chen" , ...field,}, void 0, false, {fileName: _jsxFileName, lineNumber: 42}, this )
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 41}, this)
              , _jsxDEV(FormMessage, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 44}, this )
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 39}, this)
          ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 35}, this
        )
        , _jsxDEV(FormField, {
          control: form.control,
          name: "email",
          render: ({ field }) => (
            _jsxDEV(FormItem, { children: [
              _jsxDEV(FormLabel, { children: "Email"}, void 0, false, {fileName: _jsxFileName, lineNumber: 53}, this)
              , _jsxDEV(FormControl, { children: 
                _jsxDEV(Input, { type: "email", placeholder: "alice@example.com", ...field,}, void 0, false, {fileName: _jsxFileName, lineNumber: 55}, this )
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 54}, this)
              , _jsxDEV(FormMessage, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 57}, this )
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 52}, this)
          ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 48}, this
        )
        , _jsxDEV(FormField, {
          control: form.control,
          name: "phone",
          render: ({ field }) => (
            _jsxDEV(FormItem, { children: [
              _jsxDEV(FormLabel, { children: "Phone"}, void 0, false, {fileName: _jsxFileName, lineNumber: 66}, this)
              , _jsxDEV(FormControl, { children: 
                _jsxDEV(Input, { placeholder: "+14155551001", className: "font-mono", ...field,}, void 0, false, {fileName: _jsxFileName, lineNumber: 68}, this )
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 67}, this)
              , _jsxDEV(FormMessage, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 70}, this )
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 65}, this)
          ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 61}, this
        )
        , _jsxDEV('div', { className: "flex justify-end gap-2 pt-2"   , children: [
          _jsxDEV(Button, { type: "button", variant: "outline", onClick: onCancel, disabled: isSubmitting, children: "Cancel"

          }, void 0, false, {fileName: _jsxFileName, lineNumber: 75}, this)
          , _jsxDEV(Button, { type: "submit", disabled: isSubmitting, children: 
            isSubmitting ? "Saving..." : "Create"
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 78}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 74}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 34}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 33}, this)
  );
}
