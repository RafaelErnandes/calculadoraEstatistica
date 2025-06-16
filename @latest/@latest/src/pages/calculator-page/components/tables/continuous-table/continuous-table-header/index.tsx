import { TableCell, TableHead, TableRow } from "@mui/material";

export const ContinuousTableHeader = () => (
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
);
