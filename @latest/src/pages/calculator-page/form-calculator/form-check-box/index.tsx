import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

import { CheckboxButtonsProps } from ".";

export const CheckboxButtons = (props: CheckboxButtonsProps) => {
  const { register } = props;

  return (
    <FormGroup row>
      <FormControlLabel
        control={<Checkbox />}
        label="Média"
        {...register("media")}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Moda"
        {...register("moda")}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Mediana"
        {...register("mediana")}
      />
    </FormGroup>
  );
};
