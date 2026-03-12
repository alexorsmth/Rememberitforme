import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export default function OldIdeaTable() {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Idea Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell>App idea</TableCell>
            <TableCell>A tracker for memories and thoughts</TableCell>
            <TableCell>March 11</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Game idea</TableCell>
            <TableCell>A puzzle game with choices</TableCell>
            <TableCell>March 9</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}