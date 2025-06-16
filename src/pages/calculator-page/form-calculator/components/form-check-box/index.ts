import { CalculatorFormData } from "../../index";
import { UseFormRegister } from "react-hook-form";

export type CheckboxButtonsProps = {
  register: UseFormRegister<CalculatorFormData>;
  watch: () => CalculatorFormData;
};
