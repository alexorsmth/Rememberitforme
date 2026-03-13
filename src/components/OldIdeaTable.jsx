import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function IdeasTable({ ideas }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Idea</TableCell>
            <TableCell>Urgency</TableCell>
            <TableCell>Start Day</TableCell>
            <TableCell>End Day</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {ideas.map((idea) => (
            <TableRow key={idea.id}>
              <TableCell>{idea.id}</TableCell>
              <TableCell>{idea.idea_meat}</TableCell>
              <TableCell>{idea.urgency}</TableCell>
              <TableCell>{idea.idea_start}</TableCell>
              <TableCell>{idea.idea_end}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}