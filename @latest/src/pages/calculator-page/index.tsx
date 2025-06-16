import { FormCalculator } from "./form-calculator/index.tsx";
import { useRef } from "react";

export const CalculatorPage = () => {
  const tableRef = useRef<HTMLDivElement>(null);

  const handleScrollToTable = () => {
    tableRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col">
      <div className="min-h-screen flex bg-zinc-100 p-6 dark:bg-zinc-900 shadow-md">
        <FormCalculator onSubmitSuccess={handleScrollToTable} />
      </div>
    </div>
  );
};
