// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";

// import { useCalculator } from "../../../context/calculator-context/index.tsx";

// export const TableCalculator = () => {
//   const { result } = useCalculator();

//   if (!result)
//     return <p className="text-center text-gray-500">Nenhum dado disponivel</p>;

//   console.log(result.table);

//   return (
//     <div>
//       <TableContainer
//         component={Paper}
//         sx={{ maxWidth: 800, margin: "0 auto" }}
//         className="w-full overflow-x-auto"
//       >
//         <Table
//           size="medium"
//           sx={{
//             "& td, & th": {
//               paddingLeft: 6,
//               paddingRight: 6,
//               whiteSpace: "nowrap",
//             },
//             "& thead": {
//               backgroundColor: "#e5e7eb",
//             },
//             "& tbody tr:nth-of-type(odd)": {
//               backgroundColor: "#f9fafb",
//             },
//             ".dark & td, .dark & th": {
//               color: "#F1F5F9",
//             },
//             ".dark & thead": {
//               backgroundColor: "#121212",
//               fontWeight: "bold",
//             },
//             ".dark & tbody tr:nth-of-type(odd)": {
//               backgroundColor: "#1f1f1f",
//             },
//           }}
//           className="dark:bg-zinc-800"
//         >
//           <TableHead>
//             <TableRow>
//               <TableCell>Classes</TableCell>
//               <TableCell align="center">Xi</TableCell>
//               <TableCell align="center">f₁</TableCell>
//               <TableCell align="center">fac</TableCell>
//               <TableCell></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {result.table.listLineTable.map((row, index) => (
//               <TableRow key={index}>
//                 <TableCell>
//                   {row.classe.li} - {row.classe.ls}
//                 </TableCell>
//                 <TableCell align="center">{row.xi}</TableCell>
//                 <TableCell align="center">{row.fi}</TableCell>
//                 <TableCell align="center">{row.fac}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };
