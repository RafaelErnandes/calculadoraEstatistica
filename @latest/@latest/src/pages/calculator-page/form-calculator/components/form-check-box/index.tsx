import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

import { CheckboxButtonsProps } from ".";
import { useThemeStore } from "../../../../../components/toggle-theme/index";

export const CheckboxButtons = (props: CheckboxButtonsProps) => {
  const { register } = props;
  const { isDark } = useThemeStore();

  const checkboxColor = isDark ? "#7C3AED" : "#2563EB";

  return (
    <FormGroup row>
      {["Média", "Moda", "Mediana", "Desvio Padrão"].map((label, index) => (
        <FormControlLabel
          key={index}
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
          className="dark:text-zinc-100"
          {...register(
            label === "Média"
              ? "average"
              : label === "Moda"
              ? "mode"
              : label === "Mediana"
              ? "median"
              : "standardDeviation"
          )}
        />
      ))}
    </FormGroup>
  );
};
