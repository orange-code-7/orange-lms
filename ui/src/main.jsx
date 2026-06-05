import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "react-loading-skeleton/dist/skeleton.css";
import "@/styles/global.css";

import App from "./app/App.jsx";
import store from "@/app/store";

import { useThemeStore } from "@/app/store/theme";

/**
 * Bootstrap theme saat app load
 */
useThemeStore.getState().setTheme(useThemeStore.getState().theme);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
