import { FormControl, FormControlLabel, RadioGroup } from "@mui/material";

import Radio from "@mui/material/Radio";
import { RadioButtonsProps } from ".";

export const RadioButtons = (props: RadioButtonsProps) => {
  const { register } = props;

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="row-radio-buttons-label"
        name="row-radio-buttons"
      >
        <FormControlLabel
          value="notGrouped"
          control={<Radio />}
          label="Não Agrupado"
          className="dark:text-zinc-100"
          {...register("type", { required: "Selecione uma opção" })}
        />
        <FormControlLabel
          value="grouped"
          control={<Radio />}
          label="Agrupado"
          className="dark:text-zinc-100"
          {...register("type", { required: "Selecione uma opção" })}
        />
        <FormControlLabel
          value="continuous"
          control={<Radio />}
          label="Contínuo"
          className="dark:text-zinc-100"
          {...register("type", { required: "Selecione uma opção" })}
        />
      </RadioGroup>
    </FormControl>
  );
};
