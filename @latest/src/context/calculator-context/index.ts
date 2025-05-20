import React from "react";

export type Classe = {
  li: number;
  ls: number;
};

export type LineTable = {
  classe: Classe;
  fi: number;
  xi: number;
  fac: number;
  xiMultiplyFi: number;
  moduleXiMinusAverageMultiplyFi: number;
  moduleSquareXisMinusAverageMultiplyFi: number;
};

export type Table = {
  listLineTable: LineTable[];
  totalFac: number;
  totalXi: number;
  totalXiMultiplyFi: number;
  totalModuleXiMinusAverageMultiplFi: number;
  totalModuleSquareXiMinusAverageMultiplFi: number;
  at: number;
  c: number;
  k: number;
  n: number;
};

export type CalculatorData = {
  average: number;
  median: number;
  mode: number;
  standardDeviation: number;
  table: Table;
};

export type CalculatorContextType = {
  result: CalculatorData | null;
  setResult: (data: CalculatorData) => void;
};

export type CalculatorProviderProps = {
  children: React.ReactNode;
};
