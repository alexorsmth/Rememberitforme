import { Stack, TextField, Typography, ButtonBase, Dialog, DialogTitle, DialogContent } from "@mui/material";
import NewIdeaCalendar from "./NewIdeaCalendar";
import UrgencyButton from "./UrgencyButton";
import { useState } from "react";



const STORAGE_KEY = "ideas";

export default function NewIdea({ onIdeaSaved }) {
  const [ideaText, setIdeaText] = useState("");
  const [urgency, setUrgency] = useState("");
   const [calOpen, setCalOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    start: "",
    end: "",
  });

  function saveIdea() {
    const newIdea = {
      id: Date.now(),
      idea_meat: ideaText,
      urgency: urgency,
      idea_start: selectedRange.start,
      idea_end: selectedRange.end,
    };

    const savedIdeas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const updatedIdeas = [...savedIdeas, newIdea];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIdeas));
    console.log("Saved locally:", newIdea);
    console.log("All local ideas:", updatedIdeas);

    if (onIdeaSaved) {
      onIdeaSaved();
    }

    setIdeaText("");
    setUrgency("");
    setSelectedRange({
      start: "",
      end: "",
    });
  }

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
          onChange={(e) => setIdeaText(e.target.value)}
          variant="standard"
        />

        <Stack
          direction="row"
          spacing={5}
          justifyContent="center"
          sx={{ mt: 10 }}
        >
          <UrgencyButton urgency={urgency} setUrgency={setUrgency} />
        </Stack>

        <Typography
          style={{ fontFamily: "monospace" }}
          variant="h4"
          gutterBottom
        >
          When'd You Want That?
        </Typography>

        <ButtonBase onClick={() => setCalOpen(true)}>
          <img src="/images/dates.png" alt="Dates" className="menu-button" />

          
        </ButtonBase>

        <Dialog
          open={calOpen}
          onClose={() => setCalOpen(false)}
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle>Dates</DialogTitle>
          <DialogContent>
           <NewIdeaCalendar setSelectedRange={setSelectedRange} />
          </DialogContent>
        </Dialog>

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