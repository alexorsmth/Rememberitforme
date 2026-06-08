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
import "../App.css";
const STORAGE_KEY = "ideas";
import SaveIdeaDialogue from "./SaveButton";

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
    if (!ideaText.trim()) {
      return false;
    }

    const newIdea = {
      id: Date.now(),
      idea_meat: ideaText,
      idea_desc: ideaDesc,
      label: selectedLabel,
      idea_start: selectedRange.start,
      idea_end: selectedRange.end,
    };

    const savedIdeas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const updatedIdeas = [...savedIdeas, newIdea];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIdeas));

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

    return true;
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

  const dialogueTextFieldStyle = {
    backgroundColor: "black",

    "& .MuiOutlinedInput-root": {
      color: "white",
      fontFamily: "Lora",
      backgroundColor: "black",

      "& fieldset": {
        borderColor: "white",
        borderWidth: "2px",
      },

      "&:hover fieldset": {
        borderColor: "#e0d500",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#e0d500",
      },
    },

    "& .MuiInputLabel-root": {
      color: "white",
      fontFamily: "Lora",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#e0d500",
    },
  };

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
        sx={{ mt: 10, mb: 15 }}
      >
        <TextField
          label="What's on your mind?"
          multiline
          maxRows={4}
          fullWidth
          value={ideaText}
          slotProps={{ htmlInput: { maxLength: 15 } }}
          onChange={(e) => setIdeaText(e.target.value)}
          variant="outlined"
          sx={dialogueTextFieldStyle}
        />
        {/* the desc. box */}
        <TextField
          label="Description"
          multiline
          maxRows={4}
          fullWidth
          value={ideaDesc}
          onChange={(e) => setIdeaDesc(e.target.value)}
          variant="outlined"
          sx={dialogueTextFieldStyle}
        />
        <LabelSelect
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
        />

        {/* Date button*/}

        <ButtonBase onClick={() => setCalOpen(true)}>
          <Typography
            sx={{ mt: 3, p: 2, border: "2px solid white", color: "white",   backgroundColor: "black", fontSize: "20px", fontFamily: "Lora" }}

            variant="h4"
          
            gutterBottom
          >
            {dateButtonText}
          </Typography>
        </ButtonBase>

        {/* Dialog for calendar */}
        <Dialog
          sx={{
            //You can copy the code below in your theme
            background: "#000",
            "& .MuiPaper-root": {
              background: "#000",
            },
          }}
          open={calOpen}
          onClose={() => setCalOpen(false)}
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle>Dates</DialogTitle>
          <DialogContent>
            <NewIdeaCalendar setSelectedRange={setSelectedRange} />
            <ButtonBase onClick={() => setCalOpen(false)}>
              <img
                src="./images/Save.png"
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

        <SaveIdeaDialogue onSaveIdea={saveIdea} />
      </Stack>
    </>
  );
}
