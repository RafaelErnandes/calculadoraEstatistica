import { FormValues, InputLine } from "./continuous-table-row/index.ts";
import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { ContinuousTableHeader } from "./continuous-table-header";
import { ContinuousTableProps } from "./index.ts";
import { ContinuousTableRow } from "./continuous-table-row/index.tsx";
import { toast } from "react-toastify";

export const ContinuousTable = (props: ContinuousTableProps) => {
  const { fi, li, ls, onCalculate } = props;

  const { control, watch } = useForm<FormValues>({
    defaultValues: {
      lines: [{ fi, xi: 0, fac: 0, classe: { li, ls } }],
    },
  });

  const {
    fields,
    append,
    update: updateField,
    remove,
  } = useFieldArray({
    control,
    name: "lines",
  });

  const [firstLi, setFirstLi] = useState<number>(li);
  const [firstLs, setFirstLs] = useState<number>(ls);

  const lines = watch("lines") as InputLine[];

  useEffect(() => {
    lines.forEach((line, idx) => {
      const xi = (line.classe.li + line.classe.ls) / 2;
      const fac = lines
        .slice(0, idx + 1)
        .reduce((sum, l) => sum + Number(l.fi || 0), 0);

      if (line.xi !== xi || line.fac !== fac) {
        updateField(idx, { ...line, xi, fac });
      }
    });
  }, [
    lines.map((line) => line.fi).join(","),
    lines.map((line) => `${line.classe.li},${line.classe.ls}`).join(","),
    updateField,
  ]);

  const updateLinesFromFirst = (newLi: number, newLs: number) => {
    const interval = newLs - newLi;
    if (interval <= 0) return;

    updateField(0, { ...lines[0], classe: { li: newLi, ls: newLs } });

    for (let i = 1; i < fields.length; i++) {
      const updatedLi = newLi + i * interval;
      const updatedLs = updatedLi + interval;
      updateField(i, { ...lines[i], classe: { li: updatedLi, ls: updatedLs } });
    }
  };

  const handleFirstLiChange = (value: number) => {
    setFirstLi(value);
    updateLinesFromFirst(value, firstLs);
  };

  const handleFirstLsChange = (value: number) => {
    setFirstLs(value);
    updateLinesFromFirst(firstLi, value);
  };

  const handleAddLine = () => {
    const last = lines[lines.length - 1];
    if (last.classe.li >= last.classe.ls || last.fi <= 0) {
      toast.error(
        "Preencha corretamente a última linha antes de adicionar outra."
      );
      return;
    }

    const interval = firstLs - firstLi;
    if (interval <= 0) {
      alert("Intervalo inválido na primeira linha.");
      return;
    }

    const newLi = last.classe.ls;
    const newLs = newLi + interval;

    append({ classe: { li: newLi, ls: newLs }, fi: 0, xi: 0, fac: 0 });
  };

  const handleRemoveLine = (index: number) => {
    remove(index);

    const interval = firstLs - firstLi;
    if (interval <= 0) return;

    const currentLines = watch("lines");

    for (let i = index; i < currentLines.length; i++) {
      const previous =
        i === 0
          ? { classe: { li: firstLi, ls: firstLs } }
          : currentLines[i - 1];

      const newLi = previous.classe.ls;
      const newLs = newLi + interval;

      updateField(i, { ...currentLines[i], classe: { li: newLi, ls: newLs } });
    }
  };

  const handleCalculateClick = () => {
    onCalculate(lines);
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
        <ContinuousTableHeader />
        <TableBody>
          {fields.map((field, index) => (
            <ContinuousTableRow
              key={field.id}
              fieldId={field.id}
              index={index}
              firstLi={firstLi}
              firstLs={firstLs}
              lines={lines}
              control={control}
              onFirstLiChange={handleFirstLiChange}
              onFirstLsChange={handleFirstLsChange}
              onAddLine={handleAddLine}
              onRemoveLine={handleRemoveLine}
            />
          ))}
          <tr>
            <td colSpan={6} className="p-4 border-b border-gray-200">
              <button
                type="button"
                onClick={handleCalculateClick}
                className="bg-blue-600 dark:bg-purple-600 text-white w-full rounded-md p-2 hover:bg-blue-700 dark:hover:bg-purple-700 transition cursor-pointer"
              >
                Calcular
              </button>
            </td>
          </tr>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
