import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const TableCalculator = () => {
  return (
    <div className="w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[50vw] p-8">
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 800,
          margin: "0 auto",
        }}
        className="w-full overflow-x-auto"
      >
        <Table
          size="medium"
          sx={{
            "& td, & th": {
              paddingLeft: "6px",
              paddingRight: "6px",
              whiteSpace: "nowrap",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Classes</TableCell>
              <TableCell align="center">Xi</TableCell>
              <TableCell align="center">Fi</TableCell>
              <TableCell align="center">Fac</TableCell>
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
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
