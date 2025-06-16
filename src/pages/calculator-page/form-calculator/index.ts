export type CalculatorFormData = {
  listNumber: string;
  type: "notGrouped" | "grouped" | "continuous";
  average?: boolean;
  mode?: boolean;
  median?: boolean;
  standardDeviation?: boolean;
};

export type FormCalculatorProps = {
  onSubmitSuccess?: () => void;
};
