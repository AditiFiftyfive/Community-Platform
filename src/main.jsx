import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import store from "./reduxTK/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AuthSync from "./reduxTK/AuthSync"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <BrowserRouter>
          <AuthSync />
          <App />
        </BrowserRouter>
      </ClerkProvider>
    </Provider>
  </React.StrictMode>
);
