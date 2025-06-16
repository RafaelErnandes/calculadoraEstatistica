import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import statisticImage from "../../../../../images/statisticImage.png";
import { useCalculator } from "../../../../../context/calculator-context/index.tsx";

export const GroupedTableResult = () => {
  const { result } = useCalculator();

  if (!result?.table) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <img src={statisticImage} alt="Nenhum cálculo" className="w-52 h-52" />
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white">
            Nenhum cálculo realizado
          </h2>
          <p className="text-sm text-zinc-300">
            Faça um cálculo para visualizar os resultados da tabela.
          </p>
        </div>
      </div>
    );
  }

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
            <TableCell>Classes (Li - Ls)</TableCell>
            <TableCell align="center">Xi</TableCell>
            <TableCell align="center">Fi</TableCell>
            <TableCell align="center">Fac</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {result.table.listLineTable.map((line, index) => (
            <TableRow key={index}>
              <TableCell>
                {line.classe.li} - {line.classe.ls}
              </TableCell>
              <TableCell align="center">{line.xi}</TableCell>
              <TableCell align="center">{line.fi}</TableCell>
              <TableCell align="center">{line.fac}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
