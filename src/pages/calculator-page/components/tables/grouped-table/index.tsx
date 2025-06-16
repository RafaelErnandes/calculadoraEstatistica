import { FormValues, GroupedTableProps } from ".";
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

export const GroupedTable = (props: GroupedTableProps) => {
  const { average, lines, onCalculate } = props;

  const { control, register, watch } = useForm<FormValues>({
    defaultValues: {
      lines,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lines",
  });

  const watchedLines = watch("lines");

  const handleAddLine = () => {
    const last = watchedLines[watchedLines.length - 1];
    if (last?.xi === undefined || last?.fi === undefined) {
      toast.error(
        "Preencha corretamente a última linha antes de adicionar outra."
      );
      return;
    }

    append({ xi: 0, fi: 0 });
  };

  const handleCalculateClick = () => {
    const hasInvalid = watchedLines.some(
      (line) => isNaN(line.xi) || isNaN(line.fi)
    );
    if (hasInvalid) {
      toast.error("Todos os campos devem ser preenchidos corretamente.");
      return;
    }

    onCalculate(watchedLines);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        margin: "0 auto",
        maxHeight: fields.length > 3 ? 300 : "none",
        overflowY: fields.length > 3 ? "auto" : "visible",
      }}
    >
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
            <TableCell>Xi</TableCell>
            <TableCell>Fi</TableCell>
            <TableCell>Xi * Fi</TableCell>
            <TableCell>(Xi - x̄)²</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((field, index) => {
            const xi = Number(watchedLines[index]?.xi ?? 0);
            const fi = Number(watchedLines[index]?.fi ?? 0);
            const xiFi = xi * fi;
            const diffSquared =
              average !== null ? Math.pow(xi - average, 2) : 0;
            const isLastLine = index === fields.length - 1;

            return (
              <TableRow key={field.id}>
                <TableCell>
                  <input
                    type="number"
                    style={{ width: "50%" }}
                    className="border-b text-center"
                    {...register(`lines.${index}.xi`, { valueAsNumber: true })}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="number"
                    style={{ width: "50%" }}
                    className="border-b text-center"
                    {...register(`lines.${index}.fi`, { valueAsNumber: true })}
                  />
                </TableCell>
                <TableCell>{!isNaN(xiFi) ? xiFi : "-"}</TableCell>
                <TableCell>{average !== null ? diffSquared : "-"}</TableCell>
                <TableCell align="center">
                  <div className="flex items-center justify-center gap-2">
                    {isLastLine && (
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
            <TableCell colSpan={5}>
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
