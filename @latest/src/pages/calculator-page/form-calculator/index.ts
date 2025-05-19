export type CalculatorFormProps = {};

export type CalculatorFormData = {
  value: string;
  type: "notGrouped" | "grouped";
  average?: boolean;
  mode?: boolean;
  median?: boolean;
};
