export type CalculatorFormProps = {};

export type CalculatorFormData = {
  value: string;
  type: "notGrouped" | "grouped" | "continuous";
  average?: boolean;
  mode?: boolean;
  median?: boolean;
  standardDeviation?: boolean;
};
