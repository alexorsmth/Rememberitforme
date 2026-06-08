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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <>
    <Stack>
    <Box
  sx={{
    position: "relative",
    width: "570px",
    maxWidth: "100%",
    mx: "auto",
    mt: 4,
    mb: 4,
  }}
>
  <Box
    component="img"
    src="/images/IdeaDetails.png"
    alt="Idea details"
    sx={{
      width: "100%",
      display: "block",
    }}
  />
<Box
sx={{
      position: "absolute",
      top: "70px",
      left: "210px",
      right: "45px",
      bottom: "45px",

      display: "flex",
      flexDirection: "column",
      gap: 1,

      overflowY: "auto",
    }}
>
     <Typography
     sx={{
        fontFamily: "Lora",
        fontSize: { xs: "24px", md: "24px" },
        color: "#e0d500",
        mb:4
      }}
    >
  
      Here's your wonderful idea!
    </Typography>

</Box>
  <Box
    sx={{
      position: "absolute",
      top: "130px",
      left: "30px",
      right: "45px",
      bottom: "45px",

      display: "flex",
      flexDirection: "column",
      gap: 1,

      overflowY: "auto",
    }}
  >
   

    <Typography
      sx={{
        fontFamily: "Lora",
        fontSize: { xs: "22px", md: "22px" },
        textDecoration: "underline",
        textTransform: "uppercase",
        lineHeight: 1,
        color: "white",
        wordBreak: "break-word",
      }}
    >
      {idea.idea_meat}
    </Typography>

    <Typography
      sx={{
        fontFamily: "Lora",
        fontSize: { xs: "15px", md: "15px" },
        color: "#e0d500",
      }}
    >
      Labelled under: {idea.label || "None"}
    </Typography>


          <Typography
      sx={{
        fontFamily: "Lora",
        fontSize: { xs: "12px", md: "12px" },
        lineHeight: 1.35,
        color: "white",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        mt: 0,
      }}
    >
      {idea.idea_desc || "No description"}
    </Typography>

    <Typography
      sx={{
        fontFamily: "Lora",
        fontSize: { xs: "14px", md: "14px" },
        color: "#d8d8d8",
      }}
    >
      Date: {formatDate(idea.idea_start)} -  {formatDate(idea.idea_end)}
    </Typography>



  </Box>
</Box>

      <Stack direction="column" spacing={6}
      sx = {{mb:20}}
      >
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
         </Stack>
</>
    
  );
}
