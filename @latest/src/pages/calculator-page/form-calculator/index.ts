export type CalculatorFormProps = {};

export type CalculatorFormData = {
  listNumber: string;
  type: "notGrouped" | "grouped" | "continuous";
  average?: boolean;
  mode?: boolean;
  median?: boolean;
  standardDeviation?: boolean;
};
