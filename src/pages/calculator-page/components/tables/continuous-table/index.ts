import { Classe } from "../../../../../context/calculator-context";

type TableCalculatorProps = {
  li: number;
  ls: number;
  fi: number;
};

export type Line = {
  li: number;
  ls: number;
  fi: number;
};

export type FormValues = {
  lines: Line[];
};

export type FormSubmitProps = {
  lines: TableCalculatorProps[];
};

export type InputLine = {
  classe: Classe;
  fi: number;
  xi: number;
  fac: number;
};

export type ContinuousTableProps = {
  fi: number;
  li: number;
  ls: number;
  onCalculate: (linesData: InputLine[]) => void;
};
