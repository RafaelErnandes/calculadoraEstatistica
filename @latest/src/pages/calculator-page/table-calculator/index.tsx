import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

import { Plus } from "lucide-react";
import { StatisticalCalculatorService } from "../../../service/statisticalCalculatorService";
import { TableCalculatorProps } from "./index.ts";
import { useCalculator } from "../../../context/calculator-context/index.tsx";

type Line = TableCalculatorProps & {
  xi: number;
  fac: number;
};

export const TableCalculator = (props: TableCalculatorProps) => {
  const { fi = 0, li = 0, ls = 0 } = props;

  const [lines, setLines] = useState<Line[]>([{ li, ls, fi, xi: 0, fac: 0 }]);
  const { setResult } = useCalculator();

  useEffect(() => {
    setLines([{ li, ls, fi, xi: 0, fac: 0 }]);
  }, [li, ls, fi]);

  const handleChange = (index: number, key: keyof Line, value: string) => {
    const updated = [...lines];
    updated[index][key] = Number(value) || 0;
    setLines(updated);
  };

  const handleAddLine = () => {
    const last = lines[lines.length - 1];
    if (last.li >= last.ls || last.fi <= 0) {
      alert("Preencha corretamente a última linha antes de adicionar outra.");
      return;
    }

    const interval = last.ls - last.li;
    const newLi = last.ls;
    const newLs = last.ls + interval;

    setLines([...lines, { li: newLi, ls: newLs, fi: 0, xi: 0, fac: 0 }]);
  };

  const handleSubmit = async () => {
    const payload = {
      listLineTable: lines.map((line) => ({
        classe: { li: line.li, ls: line.ls },
        fi: line.fi,
      })),
    };

    try {
      const result = await StatisticalCalculatorService.calculateContinuous(
        payload
      );
      setResult(result);

      if (result.table.listLineTable) {
        setLines(
          result.table.listLineTable.map((line: any) => ({
            li: line.classe.li,
            ls: line.classe.ls,
            fi: line.fi,
            xi: line.xi,
            fac: line.fac,
          }))
        );
      }
    } catch (error) {
      console.error("Erro ao calcular:", error);
      alert("Erro ao calcular. Veja o console.");
    }
  };

  return (
    <div>
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
            tableLayout: "fixed",
            width: "100%",
            "& td, & th": {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              paddingLeft: 6,
              paddingRight: 6,
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "30%" }}>Classes (Li - Ls)</TableCell>
              <TableCell align="center" sx={{ width: "15%" }}>
                Xi
              </TableCell>
              <TableCell align="center" sx={{ width: "15%" }}>
                Fi
              </TableCell>
              <TableCell align="center" sx={{ width: "15%" }}>
                Fac
              </TableCell>
              <TableCell align="center" sx={{ width: "25%" }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lines.map((line, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      style={{ width: "50%" }}
                      className="border-b text-center"
                      value={line.li}
                      onChange={(e) =>
                        handleChange(index, "li", e.target.value)
                      }
                    />
                    -
                    <input
                      type="number"
                      style={{ width: "50%" }}
                      className="border-b text-center"
                      value={line.ls}
                      onChange={(e) =>
                        handleChange(index, "ls", e.target.value)
                      }
                    />
                  </div>
                </TableCell>
                <TableCell align="center">
                  <span>{line.xi}</span>
                </TableCell>
                <TableCell align="center">
                  <input
                    type="number"
                    style={{ width: "100%" }}
                    className="border-b text-center"
                    value={line.fi}
                    onChange={(e) => handleChange(index, "fi", e.target.value)}
                  />
                </TableCell>
                <TableCell align="center">
                  <span>{line.fac}</span>
                </TableCell>
                <TableCell align="center">
                  {index === lines.length - 1 && (
                    <button
                      onClick={handleAddLine}
                      className="w-full flex items-center justify-center border border-dashed rounded-md p-1 hover:bg-gray-100 dark:hover:bg-zinc-700"
                    >
                      <Plus size={18} />
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3}>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 dark:bg-purple-600 text-white w-full rounded-md p-2 hover:bg-blue-700 dark:hover:bg-purple-700 transition"
                >
                  Calcular
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
