import { ContinuousTableProps, FormValues, InputLine } from "./index";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

import { toast } from "react-toastify";

export const ContinuousTable = (props: ContinuousTableProps) => {
  const { onCalculate } = props;

  const { control, register, watch } = useForm<FormValues>({
    defaultValues: { lines: [{ li: 0, ls: 0, fi: 0 }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lines",
  });

  const watchedLines = watch("lines");

  const handleAddLine = () => {
    const last = watchedLines[watchedLines.length - 1];
    if (
      last?.li === undefined ||
      last?.ls === undefined ||
      last?.fi === undefined
    ) {
      toast.error(
        "Preencha corretamente a última linha antes de adicionar outra."
      );
      return;
    }

    append({ li: 0, ls: 0, fi: 0 });
  };

  const handleCalculateClick = () => {
    const hasInvalid = watchedLines.some(
      (line) => isNaN(line.li) || isNaN(line.ls) || isNaN(line.fi)
    );
    if (hasInvalid) {
      toast.error("Todos os campos devem ser preenchidos corretamente.");
      return;
    }

    let fac = 0;
    const formatted: InputLine[] = watchedLines.map((line) => {
      const xi = (line.li + line.ls) / 2;
      fac += line.fi;
      return {
        classe: { li: line.li, ls: line.ls },
        fi: line.fi,
        xi,
        fac,
      };
    });

    onCalculate(formatted);
  };

  let facAcumulado = 0;

  return (
    <TableContainer component={Paper}>
      <Table
        size="medium"
        sx={{
          "& td, & th": {
            paddingLeft: 3,
            paddingRight: 3,
            whiteSpace: "nowrap",
          },
          "& thead": {
            backgroundColor: "#2563EB",
          },
          "& thead th": {
            color: "#fff",
          },
          "& tbody tr:nth-of-type(odd)": {
            backgroundColor: "#f9fafb",
          },
          ".dark & td, .dark & th": {
            color: "#F1F5F9",
          },
          ".dark & thead": {
            backgroundColor: "#121212",
            fontWeight: "bold",
          },
          ".dark & tbody tr:nth-of-type(odd)": {
            backgroundColor: "#1f1f1f",
          },
        }}
        className="dark:bg-zinc-800"
      >
        <TableHead>
          <TableRow>
            <TableCell>Li</TableCell>
            <TableCell>Ls</TableCell>
            <TableCell>Xi</TableCell>
            <TableCell>Fi</TableCell>
            <TableCell>Fac</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((field, index) => {
            const li = Number(watchedLines[index]?.li ?? 0);
            const ls = Number(watchedLines[index]?.ls ?? 0);
            const fi = Number(watchedLines[index]?.fi ?? 0);
            const xi = (li + ls) / 2;

            facAcumulado += fi;

            return (
              <TableRow key={field.id}>
                <TableCell>
                  <input
                    type="number"
                    className="border-b text-center w-20"
                    {...register(`lines.${index}.li`, { valueAsNumber: true })}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="number"
                    className="border-b text-center w-20"
                    {...register(`lines.${index}.ls`, { valueAsNumber: true })}
                  />
                </TableCell>
                <TableCell>{!isNaN(xi) ? xi.toFixed(2) : "-"}</TableCell>
                <TableCell>
                  <input
                    type="number"
                    className="border-b text-center w-20"
                    {...register(`lines.${index}.fi`, { valueAsNumber: true })}
                  />
                </TableCell>
                <TableCell>
                  {!isNaN(facAcumulado) ? facAcumulado : "-"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {index === fields.length - 1 && (
                      <button
                        type="button"
                        onClick={handleAddLine}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 
                          rounded-full p-2 hover:bg-blue-200 dark:hover:bg-blue-800 
                          shadow-sm transition-all cursor-pointer"
                      >
                        <Plus size={18} />
                      </button>
                    )}
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 
                          rounded-full p-2 hover:bg-red-200 dark:hover:bg-red-800 
                          shadow-sm transition-all cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell colSpan={6}>
              <button
                type="button"
                onClick={handleCalculateClick}
                className="bg-blue-600 dark:bg-purple-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 dark:hover:bg-purple-700 w-full transition cursor-pointer"
              >
                Calcular
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
