import { FormValues, InputTable } from "./continuous-table-row/index.ts";
import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { ContinuousTableHeader } from "./continuous-table-header";
import { ContinuousTableRow } from "./continuous-table-row/index.tsx";
import { api } from "../../../../../service/calculatorServices";
import { toast } from "react-toastify";
import { useCalculator } from "../../../../../context/calculator-context/index.tsx";

export const ContinuousTable = ({ fi = 0, li = 0, ls = 0 }) => {
  const { setResult } = useCalculator();

  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      lines: [{ li, ls, fi, xi: 0, fac: 0 }],
    },
  });

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "lines",
  });

  const [firstLi, setFirstLi] = useState<number>(li);
  const [firstLs, setFirstLs] = useState<number>(ls);

  useEffect(() => {
    if (firstLi != null && firstLs != null && firstLi < firstLs) {
      api
        .post("/api/StatisticalCalculator/getXi", {
          li: firstLi,
          ls: firstLs,
        })
        .then((response) => {
          const xi = response.data;
          console.log("xi da api =", xi);
          update(0, { ...lines[0], xi });
        })
        .catch((error) => {
          console.error("Erro ao buscar xi:", error);
        });
    }
  }, [firstLi, firstLs]);

  const lines = watch("lines");
  useEffect(() => {
    lines.forEach(async (line, index) => {
      if (line.fi > 0 && line.fac !== undefined) {
        try {
          const response = await api.post("/api/StatisticalCalculator/GetFAC", {
            fi: line.fi,
          });
          const fac = response.data;

          if (fac !== line.fac) {
            update(index, { ...line, fac });
          }
        } catch (error) {
          console.error(`Erro ao buscar FAC da linha ${index}:`, error);
        }
      }
    });
  }, [lines, update]);

  const updateLinesFromFirst = (newLi: number, newLs: number) => {
    const interval = newLs - newLi;
    if (interval <= 0) return;

    update(0, { ...lines[0], li: newLi, ls: newLs });

    for (let i = 1; i < fields.length; i++) {
      const updatedLi = newLi + i * interval;
      const updatedLs = updatedLi + interval;
      update(i, { ...lines[i], li: updatedLi, ls: updatedLs });
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

  const handleAddLine = async () => {
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

    try {
      const responseXi = await api.post("/api/StatisticalCalculator/getXi", {
        li: newLi,
        ls: newLs,
      });
      const xi = responseXi.data;

      const responseFac = await api.post("/api/StatisticalCalculator/GetFAC", {
        fi: 0,
      });
      const fac = responseFac.data;

      append({ li: newLi, ls: newLs, fi: 0, xi, fac });
    } catch (error) {
      console.error("Erro ao buscar xi ou fac:", error);
      toast.error("Erro ao calcular xi ou fac da nova linha.");
      append({ li: newLi, ls: newLs, fi: 0, xi: 0, fac: 0 });
    }
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

      update(i, { ...currentLines[i], li: newLi, ls: newLs });
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (data.lines.length === 0) {
      toast.error("Preencha a primeira linha antes de calcular.");
      return;
    }

    try {
      const inputTable: InputTable = {
        lines: data.lines.map((line) => ({
          classe: { li: line.li, ls: line.ls },
          fi: line.fi,
          xi: line.xi,
          fac: line.fac,
        })),
      };

      const response = await api.post(
        "/api/StatisticalCalculator/GetFAC",
        inputTable
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao calcular, veja o console.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "100%",
          overflowX: "hidden",
        }}
      >
        <Table
          size="medium"
          sx={{
            "& td, & th": {
              paddingLeft: 6,
              paddingRight: 6,
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
                  type="submit"
                  className="bg-blue-600 dark:bg-purple-600 text-white w-full rounded-md p-2 hover:bg-blue-700 dark:hover:bg-purple-700 transition cursor-pointer"
                >
                  Calcular
                </button>
              </td>
            </tr>
          </TableBody>
        </Table>
      </TableContainer>
    </form>
  );
};
