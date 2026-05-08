import {
  Box,
  Typography,
  Button,
  TextField,
  ButtonBase,
  Stack,
} from "@mui/material";
import { useState } from "react";
import DrawingBox from "./DrawingBox";

export default function IdeaDetailsPage({ idea }) {
  const [drawingBoxes, setDrawingBoxes] = useState([]);
 //const latestBox = drawingBoxes[drawingBoxes.length - 1];
  function addDrawingBox() {
    const newBox = {
      id: Date.now(),
    };

    setDrawingBoxes([...drawingBoxes, newBox]);
  }
  if (!idea) {
    return <Typography>No idea selected.</Typography>;
  }

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

     
        <DrawingBox />

        {drawingBoxes.map((box) => (
          <DrawingBox key={box.id} />
        ))}
      </Stack>
    </Box>
  );
}
