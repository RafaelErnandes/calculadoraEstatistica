import { Classe } from "../../../../../../context/calculator-context";
import { Control } from "react-hook-form";

export type TableCalculatorProps = {
  li: number;
  ls: number;
  fi: number;
};

export type InputLine = {
  classe: Classe;
  fi: number;
  xi: number;
  fac: number;
};

export type InputTable = {
  lines: InputLine[];
};

export type Line = TableCalculatorProps & {
  xi: number;
  fac: number;
};

export type FormValues = {
  lines: Line[];
};

export type ContinuousTableRowProps = {
  index: number;
  fieldId: string;
  firstLi: number;
  firstLs: number;
  lines: Line[];
  control: Control<FormValues>;
  onFirstLiChange: (value: number) => void;
  onFirstLsChange: (value: number) => void;
  onAddLine: () => void;
  onRemoveLine: (index: number) => void;
};
