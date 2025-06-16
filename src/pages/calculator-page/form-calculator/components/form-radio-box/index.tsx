import { FormControlLabel, RadioGroup } from "@mui/material";

import Radio from "@mui/material/Radio";
import { RadioButtonsProps } from ".";
import { useThemeStore } from "../../../../../components/toggle-theme/index";

export const RadioButtons = (props: RadioButtonsProps) => {
  const { register, watch } = props;
  const { isDark } = useThemeStore();

  const selected = watch("type");

  const borderColor = isDark ? "border-purple-600" : "border-blue-600";
  const textColor = isDark ? "text-purple-400" : "text-blue-600";
  const defaultBorder = isDark ? "border-zinc-600" : "border-zinc-300";
  const selectedBg = isDark ? "bg-purple-500/20" : "bg-blue-100";

  return (
    <RadioGroup
      row
      aria-labelledby="row-radio-buttons-label"
      name="type"
      className="gap-3"
    >
      {[
        { value: "notGrouped", label: "Não Agrupado" },
        { value: "grouped", label: "Agrupado" },
        { value: "continuous", label: "Contínuo" },
      ].map(({ value, label }) => {
        const isSelected = selected === value;

        return (
          <div
            key={value}
            className={`p-1 rounded-lg border w-fit ${
              isSelected ? `${borderColor} ${selectedBg}` : defaultBorder
            }`}
          >
            <FormControlLabel
              sx={{ marginRight: 2, marginLeft: 0 }}
              value={value}
              control={
                <Radio
                  sx={{
                    color: isDark ? "#7C3AED" : "#2563EB",
                    "&.Mui-checked": {
                      color: isDark ? "#7C3AED" : "#2563EB",
                    },
                  }}
                />
              }
              label={label}
              className={isSelected ? textColor : "dark:text-zinc-100"}
              {...register("type", { required: "Selecione uma opção" })}
            />
          </div>
        );
      })}
    </RadioGroup>
  );
};
