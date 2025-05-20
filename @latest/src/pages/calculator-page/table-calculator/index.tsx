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

import { useState } from "react";

export const TableCalculator = () => {
  const [rows, setRows] = useState([{ classes: "", fi: "" }]);

  const handleAddRow = () => {
    setRows((prevRows) => [...prevRows, { classes: "", fi: "" }]);
  };

  const handleDeleteRow = (indexToDelete: number) => {
    setRows((prevRows) =>
      prevRows.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 800, margin: "0 auto" }}
        className="w-full overflow-x-auto"
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
              backgroundColor: "#e5e7eb",
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
              <TableCell>Classes</TableCell>
              <TableCell align="center">Xi</TableCell>
              <TableCell align="center">f₁</TableCell>
              <TableCell align="center">fac</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <input
                    type="text"
                    placeholder="Ex: 0 - 4"
                    className="w-24 p-1 outline-0 bg-transparent border-b border-zinc-400 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 dark:focus:border-purple-500"
                  />
                </TableCell>
                <TableCell align="center">—</TableCell>
                <TableCell align="center">
                  <input
                    type="text"
                    placeholder="f₁"
                    className="w-12 p-1 outline-0 bg-transparent border-b border-zinc-400 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100 text-center focus:border-blue-500 dark:focus:border-purple-500"
                  />
                </TableCell>

                <TableCell align="center">—</TableCell>
                <TableCell align="center">
                  {index > 0 && (
                    <button
                      onClick={() => handleDeleteRow(index)}
                      className="cursor-pointer"
                    >
                      <Trash2 />
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell
                colSpan={5}
                align="center"
                className="cursor-pointer hover:bg-blue-100 dark:hover:bg-zinc-700 transition"
                onClick={handleAddRow}
              >
                <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-purple-400">
                  <Plus size={18} />
                  <span>Adicionar Linha</span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
