import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const ThirdTable = () => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: 800,
        margin: "0 auto",
      }}
      className="w-full overflow-x-auto "
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
        className="dark:bg-zinc-800 "
      >
        <TableHead>
          <TableRow>
            <TableCell>Classes</TableCell>
            <TableCell align="center">Xi</TableCell>
            <TableCell align="center">f₁</TableCell>
            <TableCell align="center">fac</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>04 — 08</TableCell>
            <TableCell align="center">04</TableCell>
            <TableCell align="center">04</TableCell>
            <TableCell align="center">04</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>08 — 12</TableCell>
            <TableCell align="center">06</TableCell>
            <TableCell align="center">10</TableCell>
            <TableCell align="center">04</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>12 — 16</TableCell>
            <TableCell align="center">10</TableCell>
            <TableCell align="center">20</TableCell>
            <TableCell align="center">04</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>16 — 20</TableCell>
            <TableCell align="center">05</TableCell>
            <TableCell align="center">25</TableCell>
            <TableCell align="center">04</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>20 — 24</TableCell>
            <TableCell align="center">03</TableCell>
            <TableCell align="center">28</TableCell>
            <TableCell align="center">04</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>24 — 28</TableCell>
            <TableCell align="center">02</TableCell>
            <TableCell align="center">30</TableCell>
            <TableCell align="center">04</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <strong>Σ</strong>
            </TableCell>
            <TableCell align="center">
              <strong>N = 30</strong>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
