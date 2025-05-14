import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { App } from "./App.tsx";
import { CalculatorPage } from "./pages/calculator-page/index.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/calculdora",
    element: <CalculatorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={route}></RouterProvider>
  </StrictMode>
);
