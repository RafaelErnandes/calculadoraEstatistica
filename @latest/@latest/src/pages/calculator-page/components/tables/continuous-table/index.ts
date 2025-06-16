import { FormValues, TableCalculatorProps } from "./continuous-table-row/index";

export type FormSubmitProps = {
  lines: TableCalculatorProps[];
};

export type ContinuousTableProps = {
  fi: number;
  li: number;
  ls: number;
  onCalculate: (linesData: FormValues["lines"]) => void;
};
