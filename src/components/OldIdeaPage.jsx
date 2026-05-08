import { useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Button,
} from "@mui/material";

import DescToolTip from "./DescToolTip";
export default function IdeasTable({ ideas, onIdeaSelect, onIdeasChanged }) {
  const [selectIdea] = useState(null);
  const [deleteRow, setDeleteRow] = useState(false);

  const [selectIDs, setSelectIDs] = useState([]);
  const holdTimer = useRef(null);
  const longPressTriggered = useRef(false);

  function startHold(idea) {
    longPressTriggered.current = false;

    holdTimer.current = setTimeout(() => {
      longPressTriggered.current = true;
      setDeleteRow(true);
      setSelectIDs([idea.id]);
    }, 700);
  }

  function toggleSelectedIdea(id) {
    if (selectIDs.includes(id)) {
      setSelectIDs(selectIDs.filter((selectedId) => selectedId !== id));
    } else {
      setSelectIDs([...selectIDs, id]);
    }
  }

  function cancelHold() {
    clearTimeout(holdTimer.current);
  }

  function deleteSelectedIdeas() {
    const updatedIdeas = ideas.filter((idea) => !selectIDs.includes(idea.id));

    localStorage.setItem("ideas", JSON.stringify(updatedIdeas));

    setSelectIDs([]);
    setDeleteRow(false);

    if (onIdeasChanged) {
      onIdeasChanged();
    }
  }

  return (
    <Box>
      {deleteRow && (
        <Box sx={{ mb: 2 }}>
          <Button
            onClick={deleteSelectedIdeas}
            disabled={selectIDs.length === 0}
            color="error"
          >
            Delete Selected
          </Button>

          <Button
            onClick={() => {
              setDeleteRow(false);
              setSelectIDs([]);
            }}
            sx={{ ml: 2 }}
          >
            Cancel
          </Button>
        </Box>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Idea</TableCell>
            <TableCell>Label</TableCell>
            <TableCell>Start Day</TableCell>
            <TableCell>End Day</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {ideas.map((idea) => {
            const isSelected = selectIdea?.id === idea.id;

            return (
              <TableRow
                key={idea.id}
                onMouseDown={() => startHold(idea)}
                onMouseUp={cancelHold}
                onMouseLeave={cancelHold}
                onClick={() => {
                  if (longPressTriggered.current) {
                    longPressTriggered.current = false;
                    return;
                  }

                  if (deleteRow) {
                    toggleSelectedIdea(idea.id);
                  } else {
                    onIdeaSelect(idea);
                  }
                }}
                sx={{
                  cursor: "pointer",
                  backgroundColor: isSelected ? "#ffe6e6" : "inherit",
                  "&:hover": {
                    backgroundColor: deleteRow ? "#fff0f0" : "#f5f5f5",
                  },
                }}
              >
                <TableCell>
                  <DescToolTip
                    text={idea.idea_meat}
                    ideaDesc={idea.idea_desc}
                  />
                </TableCell>
                <TableCell>{idea.label}</TableCell>
                <TableCell>{idea.idea_start}</TableCell>
                <TableCell>{idea.idea_end}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}
