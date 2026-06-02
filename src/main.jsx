const _jsxFileName = "";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import { store } from "./store";
import "./index.css";

async function enableMocking() {
  if (!import.meta.env.DEV) return;
  const { worker } = await import("./mocks/browser");
  await worker.start({ onUnhandledRequest: "warn" });
}

async function bootstrap() {
  await enableMocking();
  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("Root element #root not found in index.html");
  createRoot(rootElement).render(
    _jsxDEV(StrictMode, { children: 
      _jsxDEV(Provider, { store: store, children: 
        _jsxDEV(BrowserRouter, { children: 
          _jsxDEV(App, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 24}, this )
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 23}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 22}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 21}, this),
  );
}

void bootstrap();
