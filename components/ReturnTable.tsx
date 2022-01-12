import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { getReturnPercentage } from "../src/planner";

export default function ReturnTable() {
  return <Table>
    <TableHead>
      <TableRow>
        <TableCell>Age</TableCell>
        <TableCell>Return</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>till 45</TableCell>
        <TableCell>{getReturnPercentage(20)}% </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>45 to 55</TableCell>
        <TableCell>{getReturnPercentage(50)}% </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>55 to 65</TableCell>
        <TableCell>{getReturnPercentage(60)}% </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>65 to 75</TableCell>
        <TableCell>{getReturnPercentage(70)}% </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>above 75</TableCell>
        <TableCell>{getReturnPercentage(80)}% </TableCell>
      </TableRow>
    </TableBody>
  </Table>;
}