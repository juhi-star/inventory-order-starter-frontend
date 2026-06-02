const _jsxFileName = "";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import {
  CircleCheck,
  Info,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"



const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme()

  return (
    _jsxDEV(Sonner, {
      theme: theme ,
      className: "toaster group" ,
      icons: {
        success: _jsxDEV(CircleCheck, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 21}, this ),
        info: _jsxDEV(Info, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 22}, this ),
        warning: _jsxDEV(TriangleAlert, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 23}, this ),
        error: _jsxDEV(OctagonX, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 24}, this ),
        loading: _jsxDEV(LoaderCircle, { className: "h-4 w-4 animate-spin"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 25}, this ),
      },
      toastOptions: {
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      },
      ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 17}, this
    )
  )
}

export { Toaster }
