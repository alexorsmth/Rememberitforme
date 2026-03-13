import { Stack, TextField, Typography, ButtonBase } from "@mui/material";
import NewIdeaCalendar from "./NewIdeaCalendar";
import UrgencyButton from "./UrgencyButton";
import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function NewIdea({ onIdeaSaved } ) {
  const [ideaText, setIdeaText] = useState("");
  const [urgency, setUrgency] = useState("");
  const [selectedRange, setSelectedRange] = useState({
    start: "",
    end: "",
  });

 async function saveIdea() {
    const { data, error } = await supabase
      .from("ideas")
      .insert([
        {
          idea_meat: ideaText,
          urgency: urgency,
          idea_start: selectedRange.start,
          idea_end: selectedRange.end,
        },
      ])
      .select();

    console.log("data:", data);
    console.log("error:", error);

    if (error) {
      console.error("Supabase insert error:", error);
      return;
    }

    if (onIdeaSaved) {
      await onIdeaSaved();
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

        <NewIdeaCalendar setSelectedRange={setSelectedRange} />
         <ButtonBase onClick={saveIdea}>
            <img
              src="/images/buttonpng.png"
              alt="submitbutton"
              style={{   width: 600,  height: 150, objectFit: "cover", display: "block",  }}
            />
          </ButtonBase>
      </Stack>
    </>
  );
}
