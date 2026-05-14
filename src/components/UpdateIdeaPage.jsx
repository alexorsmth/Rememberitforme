import {
  Box,
  Typography,
  Button,
  TextField,
  ButtonBase,
  Stack,
  IconButton,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useState, useEffect } from "react";
import DrawingBox from "./DrawingBox";

export default function IdeaDetailsPage({ idea, onIdeasChanged }) {
  const [drawingBoxes, setDrawingBoxes] = useState(idea?.drawingBoxes || []);

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

  function updateDrawingBox(updatedBox) {
    setDrawingBoxes((prevBoxes) =>
      prevBoxes.map((box) => (box.id === updatedBox.id ? updatedBox : box)),
    );
  }

  function addDrawingBox() {
    const newBox = {
      id: Date.now(),
      description: "",
      drawingImage: "",
    };

    setDrawingBoxes((prevBoxes) => [...prevBoxes, newBox]);
  }

  function deleteDrawingBox(idToDelete) {
    setDrawingBoxes((prevBoxes) =>
      prevBoxes.filter((box) => box.id !== idToDelete),
    );
  }

  useEffect(() => {
    setDrawingBoxes(idea?.drawingBoxes || []);
  }, [idea]);

  useEffect(() => {
    if (!idea) {
      return;
    }

    const savedIdeas = JSON.parse(localStorage.getItem("ideas")) || [];

    const updatedIdeas = savedIdeas.map((savedIdea) => {
      if (savedIdea.id === idea.id) {
        return {
          ...savedIdea,
          drawingBoxes: drawingBoxes,
        };
      }

      return savedIdea;
    });

    localStorage.setItem("ideas", JSON.stringify(updatedIdeas));

    if (onIdeasChanged) {
      onIdeasChanged();
    }
  }, [drawingBoxes, idea, onIdeasChanged]);

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontFamily: "monospace",
          fontSize: "35px",
          color: "white",
          mt: 2,
        }}
      >
        {" "}
        {idea.idea_meat}{" "}
      </Typography>
      <Typography
        sx={{
          fontFamily: "monospace",
          fontSize: "25px",
          color: "white",
          mt: 2,
        }}
      >
        Start: {formatDate(idea.idea_start) || "No start date"}
      </Typography>
      <Typography
        sx={{
          fontFamily: "monospace",
          fontSize: "25px",
          color: "white",
          mt: 2,
        }}
      >
        End: {formatDate(idea.idea_end) || "No end date"}
      </Typography>
      <Typography
        sx={{
          fontFamily: "monospace",
          fontSize: "15px",
          color: "white",
          mt: 2,
        }}
      >
        Description: {idea.idea_desc || "No description"}
      </Typography>
      <Stack direction="column" spacing={4}>
        <IconButton sx={{ color: "white" }} onClick={addDrawingBox}>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>

        {drawingBoxes.map((box) => (
          <DrawingBox
            key={box.id}
            box={box}
            onChange={updateDrawingBox}
            onDelete={() => deleteDrawingBox(box.id)} //click trash to kill it
          />
        ))}
      </Stack>
    </Box>
  );
}
