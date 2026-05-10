import {
  Box,
  Typography,
  Button,
  TextField,
  ButtonBase,
  Stack,
} from "@mui/material";
import { useState, useEffect } from "react";
import DrawingBox from "./DrawingBox";

export default function IdeaDetailsPage({ idea, onIdeasChanged }) {
  const [drawingBoxes, setDrawingBoxes] = useState(idea?.drawingBoxes || []);

  function updateDrawingBox(updatedBox) {
    setDrawingBoxes((prevBoxes) =>
      prevBoxes.map((box) => (box.id === updatedBox.id ? updatedBox : box)),
    );
  }

  function saveIdeaDrawings() {
    const savedIdeas = JSON.parse(localStorage.getItem("ideas")) || [];

    const updatedIdeas = savedIdeas.map((savedIdea) => {
      //load all ideas from local storage
      if (savedIdea.id === idea.id) {
        //find currently edited idea
        return {
          ...savedIdea, //replace box with new box array
          drawingBoxes: drawingBoxes,
        };
      }

      return savedIdea;
    });

    localStorage.setItem("ideas", JSON.stringify(updatedIdeas));

    if (onIdeasChanged) {
      onIdeasChanged();
    }
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
      <Typography variant="h4" gutterBottom>
        {" "}
        {idea.idea_meat}{" "}
      </Typography>
      <Typography>Start: {idea.idea_start || "No start date"}</Typography>
      <Typography>End: {idea.idea_end || "No end date"}</Typography>
      <Typography sx={{ mt: 2 }}>
        Description: {idea.idea_desc || "No description"}
      </Typography>
      <Stack direction="column" spacing={4}>
        <ButtonBase onClick={addDrawingBox}>
          <img
            src="./images/anotherOne.png"
            alt="Old Ideas"
            className="menu-button"
            width={100}
            height={50}
          />
        </ButtonBase>

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
