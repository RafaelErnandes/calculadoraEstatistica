import {
  CalculatorContextType,
  CalculatorData,
  CalculatorProviderProps,
} from ".";
import { createContext, useContext, useState } from "react";

const CalculatorContext = createContext<CalculatorContextType | undefined>(
  undefined
);

export const CalculatorProvider = (props: CalculatorProviderProps) => {
  const { children } = props;
  const [result, setResult] = useState<CalculatorData | null>(null);

  return (
    <CalculatorContext.Provider value={{ result, setResult }}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (!context) throw new Error("useCalculator n ta aqui la ele kkk");
  return context;
};
