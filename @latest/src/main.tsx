import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AboutUs } from "./pages/sobre-nos/index.tsx";
import { App } from "./App.tsx";
import { CalculatorPage } from "./pages/calculator-page/index.tsx";
import { CalculatorProvider } from "./context/calculator-context/index.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/calculadora",
    element: <CalculatorPage />,
  },
  {
    path: "/sobre-nos",
    element: <AboutUs />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CalculatorProvider>
      <RouterProvider router={route}></RouterProvider>
    </CalculatorProvider>
  </StrictMode>
);
