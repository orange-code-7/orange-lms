import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "react-loading-skeleton/dist/skeleton.css";

import "@/styles/global.css";

import App from "./app/App.jsx";
import { useThemeStore } from "@/features/theme/theme.store";

// bootstrap theme saat app load
useThemeStore.getState().setTheme(useThemeStore.getState().theme);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
