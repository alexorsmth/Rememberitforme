import { useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Button,
  Typography,
  ButtonBase,
  Stack,
} from "@mui/material";

function formatDate(dateString) {
  if (!dateString) {
    return "No date";
  }

  const date = new Date(dateString + "T00:00:00");

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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
  //toggleSelectedIdea
  function toggleSelectedIdea(id) {
    if (selectIDs.includes(id)) {
      setSelectIDs(selectIDs.filter((selectedId) => selectedId !== id));
    } else {
      setSelectIDs([...selectIDs, id]);
    }
  }
  //cancelHold
  function cancelHold() {
    clearTimeout(holdTimer.current);
  }
  //deleteSelectedIdeas
  function deleteSelectedIdeas() {
    const updatedIdeas = ideas.filter((idea) => !selectIDs.includes(idea.id));

    localStorage.setItem("ideas", JSON.stringify(updatedIdeas));

    setSelectIDs([]);
    setDeleteRow(false);

    if (onIdeasChanged) {
      onIdeasChanged();
    }
  }
  //the big
  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      {deleteRow && (
        <Box
          sx={{
            mb: 2,
          }}
        >
          <Button
            sx={{ border: "2px solid red" }}
            onClick={deleteSelectedIdeas}
            disabled={selectIDs.length === 0}
            color="error"
          >
            Delete
          </Button>

          <Button
            onClick={() => {
              setDeleteRow(false);
              setSelectIDs([]);
            }}
            sx={{
              ml: 2,
              border: "2px solid blue",
            }}
          >
            Cancel
          </Button>
        </Box>
      )}
      <Table
        sx={{
          border: "4px solid #ffffff",
          bgcolor: "#000000",
          color: "#ffffff",
          fontFamily: "monospace",
          fontSize: { xs: "12px", md: "30px" },
          mt: 6,
          minWidth: 600,
        }}
      >
        <TableHead sx={{ border: "4px solid #ffffff" }}>
          <TableRow>
            <TableCell
              sx={{
                fontFamily: "monospace",
                fontSize: { xs: "12px", md: "30px" },
                border: "#ffffff",
                color: "white",
              }}
            >
              Idea
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "monospace",
                fontSize: { xs: "20px", md: "30px" },
                color: "white",
                border: "#ffffff",
              }}
            >
              Label
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "monospace",
                fontSize: { xs: "20px", md: "30px" },
                border: "#ffffff",
                color: "white",
              }}
            >
              Start Day
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "monospace",
                fontSize: { xs: "20px", md: "30px" },
                border: "#000000",
                color: "white",
              }}
            >
              End Day
            </TableCell>
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
                  backgroundColor: isSelected ? "#ffea00d8" : "inherit",
                  "&:hover": {
                    backgroundColor: deleteRow ? "#ffea00d8" : "#ffea00d8",
                  },
                }}
              >
                <TableCell
                  sx={{
                    fontFamily: "ui-sans-serif",
                    fontSize: { xs: "12px", md: "20px" },
                    border: "3px solid #e9e9e9",
                    color: "white",
                  }}
                >
                  <DescToolTip
                    text={idea.idea_meat} //DescToolTip.jsx spans this so it focuses only on this part
                  />
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "ui-sans-serif",
                    fontSize: { xs: "12px", md: "20px" },
                    border: "3px solid #ffffff",
                    color: "white",
                  }}
                >
                  {idea.label}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "ui-sans-serif",
                    fontSize: { xs: "12px", md: "20px" },
                    border: "3px solid #ffffff",

                    color: "white",
                  }}
                >
                  {formatDate(idea.idea_start)}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "ui-sans-serif",
                    fontSize: { xs: "12px", md: "20px" },
                    border: "3px solid #ffffff",
                    color: "white",
                  }}
                >
                  {formatDate(idea.idea_end)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}
