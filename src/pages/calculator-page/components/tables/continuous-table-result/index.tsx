import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useCalculator } from "../../../../../context/calculator-context/index.tsx";

export const ContinuousTableResult = () => {
  const { result } = useCalculator();

  if (!result?.table) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold dark:text-white">
            Tabela indisponivel
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Apenas os dados contínuos irão mostrar a tabela.
          </p>
        </div>
      </div>
    );
  }

  const {
    listLineTable,
    totalFAC,
    totalXiMultiplyFi,
    totalSquareXiMinusAverageMultiplyFi,
  } = result.table;

  return (
    <TableContainer component={Paper}>
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
        className="dark:bg-zinc-800 "
      >
        <TableHead>
          <TableRow>
            <TableCell>Classes</TableCell>
            <TableCell align="center">Xi</TableCell>
            <TableCell align="center">Fi</TableCell>
            <TableCell align="center">Fac</TableCell>
            <TableCell align="center">Xi * Fi</TableCell>
            <TableCell align="center">(Xi - x̄) * Fi</TableCell>
            <TableCell align="center">(Xi - x̄)² * Fi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listLineTable.map((line, index) => (
            <TableRow key={index}>
              <TableCell>
                {line.classe.li} - {line.classe.ls}
              </TableCell>
              <TableCell align="center">{line.xi?.toFixed(2)}</TableCell>
              <TableCell align="center">{line.fi}</TableCell>
              <TableCell align="center">{line.fac}</TableCell>
              <TableCell align="center">
                {line.xiMultiplyFi?.toFixed(2)}
              </TableCell>
              <TableCell align="center">
                {line.moduleXiMinusAverageMultiplyFi?.toFixed(2)}
              </TableCell>
              <TableCell align="center">
                {line.squareXiMinusAverageMultiplyFi?.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ fontWeight: "bold" }}>
            <TableCell>Total</TableCell>
            <TableCell align="center">
              {result.table.totalXi?.toFixed(2) ?? "-"}
            </TableCell>
            <TableCell align="center">{result.table.n ?? "-"}</TableCell>
            <TableCell align="center">{totalFAC ?? "-"}</TableCell>
            <TableCell align="center">
              {totalXiMultiplyFi?.toFixed(2) ?? "-"}
            </TableCell>
            <TableCell align="center">
              {totalSquareXiMinusAverageMultiplyFi?.toFixed(2) ?? "-"}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
