import { FormControlLabel, FormGroup, RadioGroup } from "@mui/material";

import Radio from "@mui/material/Radio";
import { RadioButtonsProps } from ".";
import { useThemeStore } from "../../../../../components/toggle-theme/index";

export const RadioButtons = (props: RadioButtonsProps) => {
  const { register } = props;
  const { isDark } = useThemeStore();

  const radioboxColor = isDark ? "#7C3AED" : "#2563EB";

  return (
    <FormGroup row>
      <RadioGroup
        row
        aria-labelledby="row-radio-buttons-label"
        name="row-radio-buttons"
      >
        <FormControlLabel
          value="notGrouped"
          control={
            <Radio
              sx={{
                color: radioboxColor,
                "&.Mui-checked": {
                  color: radioboxColor,
                },
              }}
            />
          }
          label="Não Agrupado"
          className="dark:text-zinc-100"
          {...register("type", { required: "Selecione uma opção" })}
        />
        <FormControlLabel
          value="grouped"
          control={
            <Radio
              sx={{
                color: radioboxColor,
                "&.Mui-checked": {
                  color: radioboxColor,
                },
              }}
            />
          }
          label="Agrupado"
          className="dark:text-zinc-100"
          {...register("type", { required: "Selecione uma opção" })}
        />
        <FormControlLabel
          value="continuous"
          control={
            <Radio
              sx={{
                color: radioboxColor,
                "&.Mui-checked": {
                  color: radioboxColor,
                },
              }}
            />
          }
          label="Contínuo"
          className="dark:text-zinc-100"
          {...register("type", { required: "Selecione uma opção" })}
        />
      </RadioGroup>
    </FormGroup>
  );
};
