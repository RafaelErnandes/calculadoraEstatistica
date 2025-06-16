import { CalculatorFormData } from "../../index";
import { UseFormRegister } from "react-hook-form";

export type RadioButtonsProps = {
  register: UseFormRegister<CalculatorFormData>;
  watch: (name: keyof CalculatorFormData) => string | boolean | undefined;
};
