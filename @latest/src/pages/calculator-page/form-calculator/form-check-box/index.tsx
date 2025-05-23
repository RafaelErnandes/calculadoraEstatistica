import { Checkbox, FormControlLabel, FormGroup, useTheme } from "@mui/material";

import { CheckboxButtonsProps } from ".";
import { pink } from "@mui/material/colors";

export const CheckboxButtons = (props: CheckboxButtonsProps) => {
  const { register } = props;
  const theme = useTheme();

  const checkboxStyles = {
    color: theme.palette.mode === "dark" ? "#fff" : pink[800],
    "&.Mui-checked": {
      color: theme.palette.mode === "dark" ? pink[800] : pink[800],
    },
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={<Checkbox sx={checkboxStyles} />}
        label="Média"
        className="dark:text-zinc-100"
        {...register("average")}
      />
      <FormControlLabel
        control={<Checkbox sx={checkboxStyles} />}
        label="Moda"
        className="dark:text-zinc-100"
        {...register("mode")}
      />
      <FormControlLabel
        control={<Checkbox sx={checkboxStyles} />}
        label="Mediana"
        className="dark:text-zinc-100"
        {...register("median")}
      />
      <FormControlLabel
        control={<Checkbox sx={checkboxStyles} />}
        label="Desvio Padrão"
        className="dark:text-zinc-100"
        {...register("standardDeviation")}
      />
    </FormGroup>
  );
};
