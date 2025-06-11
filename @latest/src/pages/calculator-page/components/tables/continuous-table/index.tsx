import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { ContinuousTableHeader } from "./continuous-table-header";
import { ContinuousTableProps } from "./index.ts";
import { ContinuousTableRow } from "./continuous-table-row/index.tsx";
import { FormValues } from "./continuous-table-row/index.ts";
import { toast } from "react-toastify";

export const ContinuousTable = (props: ContinuousTableProps) => {
  const { fi = 0, li = 0, ls = 0, onCalculate } = props;

  const { control, watch } = useForm<FormValues>({
    defaultValues: {
      lines: [{ li, ls, fi, xi: 0, fac: 0 }],
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

  const lines = watch("lines");

  useEffect(() => {
    lines.forEach((line, idx) => {
      const xi = (line.li + line.ls) / 2;
      const fac = lines
        .slice(0, idx + 1)
        .reduce((sum, l) => sum + Number(l.fi || 0), 0);

      if (line.xi !== xi || line.fac !== fac) {
        updateField(idx, { ...line, xi, fac });
      }
    });
  }, [
    lines.map((line) => line.fi).join(","),
    lines.map((line) => `${line.li},${line.ls}`).join(","),
    updateField,
  ]);

  const updateLinesFromFirst = (newLi: number, newLs: number) => {
    const interval = newLs - newLi;
    if (interval <= 0) return;

    updateField(0, { ...lines[0], li: newLi, ls: newLs });

    for (let i = 1; i < fields.length; i++) {
      const updatedLi = newLi + i * interval;
      const updatedLs = updatedLi + interval;
      updateField(i, { ...lines[i], li: updatedLi, ls: updatedLs });
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
    if (last.li >= last.ls || last.fi <= 0) {
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

    const newLi = last.ls;
    const newLs = newLi + interval;

    append({ li: newLi, ls: newLs, fi: 0, xi: 0, fac: 0 });
  };

  const handleRemoveLine = (index: number) => {
    remove(index);

    const interval = firstLs - firstLi;
    if (interval <= 0) return;

    const currentLines = watch("lines");

    for (let i = index; i < currentLines.length; i++) {
      const previous =
        i === 0 ? { li: firstLi, ls: firstLs } : currentLines[i - 1];

      const newLi = previous.ls;
      const newLs = newLi + interval;

      updateField(i, { ...currentLines[i], li: newLi, ls: newLs });
    }
  };

  const handleCalculateClick = () => {
    onCalculate(lines);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: "700px",
        margin: "0 auto",
        overflowX: "hidden",
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
            backgroundColor: "#fff",
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
