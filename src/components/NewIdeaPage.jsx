import {
  Stack,
  TextField,
  Typography,
  ButtonBase,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
} from "@mui/material";
import NewIdeaCalendar from "./NewIdeaCalendar";
import { useState } from "react";
import LabelSelect from "./LabelCreation";

const STORAGE_KEY = "ideas";

export default function NewIdea({ onIdeaSaved }) {
  const [ideaText, setIdeaText] = useState("");
  const [calOpen, setCalOpen] = useState(false);
  const [ideaDesc, setIdeaDesc] = useState(""); 
  const [selectedLabel, setSelectedLabel] = useState("");


  const [selectedRange, setSelectedRange] = useState({
    start: "",
    end: "",
  });


  
  function saveIdea() {
    if (!ideaText) {
      return;
    }

    const newIdea = {
      id: Date.now(),
      idea_meat: ideaText,
      idea_desc: ideaDesc,
      label: selectedLabel,
      idea_start: selectedRange.start,
      idea_end: selectedRange.end,
    };
     
    const savedIdeas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; //loads saved idea 
    const updatedIdeas = [...savedIdeas, newIdea];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIdeas));
    console.log("Saved locally:", newIdea);
    console.log("All local ideas:", updatedIdeas);

    if (onIdeaSaved) {
      onIdeaSaved();
    }
   

    setIdeaText("");
    setIdeaDesc("");
    setSelectedLabel("");
    setSelectedRange({
      start: "",
      end: "",
    });
  }

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

 const dateButtonText = selectedRange.start
  ? selectedRange.end !== selectedRange.start
    ? `${formatDate(selectedRange.start)} to ${formatDate(selectedRange.end)}`
    : formatDate(selectedRange.start)
  : "When were you thinking?";

  return (
    <>
      <Stack
        direction="column"
        spacing={7}
        justifyContent="center"
        sx={{ mt: 10 }}
      >
        <TextField
          id="standard-multiline-flexible"
          label="Whats on your mind?"
          multiline
          maxRows={4}
          fullWidth
          value={ideaText}
          slotProps={{ htmlInput: { maxLength: 15 } }}
          onChange={(e) => setIdeaText(e.target.value)}
          variant="standard"
        />
        {/* the desc. box */}
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          maxRows={4}
          fullWidth
          value={ideaDesc}
          onChange={(e) => setIdeaDesc(e.target.value)}
          variant="standard"
        />
  {/* Date button*/}
        
        <ButtonBase onClick={() => setCalOpen(true)}>
          <Typography 
            sx={{ mt: 3, p: 2, border: "1px solid black" }}
            style={{ fontFamily: "monospace" }}
            variant="h4"
            gutterBottom
          >
            {dateButtonText}
          </Typography>
        </ButtonBase>
  {/* Dialog for calendar */}
        <Dialog
          open={calOpen}
          onClose={() => setCalOpen(false)}
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle>Dates</DialogTitle>
          <DialogContent>
            <NewIdeaCalendar setSelectedRange={setSelectedRange} />
            <ButtonBase 
            onClick={() => setCalOpen(false)}>
              <img
              src = "./images/Save.png"
              alt="submitbutton"
              style={{
              width: 40,
              height: 40,
              objectFit: "cover",
              display: "block",
            }}
              />
            </ButtonBase>
          </DialogContent>
        </Dialog>

  {/* label button */}
        <LabelSelect
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
        />

        <ButtonBase onClick={saveIdea}>
          <img
            src="/images/buttonpng.png"
            alt="submitbutton"
            style={{
              width: 600,
              height: 150,
              objectFit: "cover",
              display: "block",
            }}
          />
        </ButtonBase>
      </Stack>
    </>
  );
}
