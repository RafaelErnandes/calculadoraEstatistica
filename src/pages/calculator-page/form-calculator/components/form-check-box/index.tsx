import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

import { CalculatorFormData } from "../..";
import { CheckboxButtonsProps } from ".";
import { useThemeStore } from "../../../../../components/toggle-theme/index";

export const CheckboxButtons = (props: CheckboxButtonsProps) => {
  const { register, watch } = props;
  const { isDark } = useThemeStore();

  const selectedValues = watch() as unknown as Partial<
    Record<keyof CalculatorFormData, boolean>
  >;

  const checkboxColor = isDark ? "#7C3AED" : "#2563EB";
  const borderColor = isDark ? "border-purple-600" : "border-blue-600";
  const textColor = isDark ? "text-purple-400" : "text-blue-600";
  const selectedBg = isDark ? "bg-purple-500/20" : "bg-blue-100";
  const defaultBorder = isDark ? "border-zinc-600" : "border-zinc-300";

  const fields: { label: string; name: keyof CalculatorFormData }[] = [
    { label: "Média", name: "average" },
    { label: "Moda", name: "mode" },
    { label: "Mediana", name: "median" },
    { label: "Desvio Padrão", name: "standardDeviation" },
  ];

  return (
    <FormGroup row className="gap-3">
      {fields.map(({ label, name }, index) => {
        const isSelected = selectedValues[name] ?? false;
        return (
          <div
            key={index}
            className={`p-1 rounded-lg border ${
              isSelected ? `${borderColor} ${selectedBg}` : defaultBorder
            }`}
          >
            <FormControlLabel
              sx={{ marginRight: 1, marginLeft: 0 }}
              control={
                <Checkbox
                  sx={{
                    color: checkboxColor,
                    "&.Mui-checked": {
                      color: checkboxColor,
                    },
                  }}
                />
              }
              label={label}
              className={isSelected ? textColor : "dark:text-zinc-100"}
              {...register(name)}
            />
          </div>
        );
      })}
    </FormGroup>
  );
};
