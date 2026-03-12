import {Stack,  TextField,Typography, Button} from "@mui/material";
import NewIdeaCalendar from "./NewIdeaCalendar";
import UrgencyButton from "./UrgencyButton";
import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function NewIdea() {
 const [ideaText, setIdeaText] = useState("");
  const [urgency, setUrgency] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [details, setDetails] = useState(""); 

    async function saveIdea() {
    const { error } = await supabase.from("ideas").insert([
      {
        idea_meat: ideaText,
        urgency,
        idea_date: selectedDate,
        details,
      },
    ]);

    if (error) {
      console.error(error);
      return;
    }

    setIdeaText("");
    setUrgency("");
    setSelectedDate("");
    setDetails("");
  }

  return (
    <>

    <Stack  direction="column"  spacing={7}  justifyContent="center" sx={{ mt: 10 }} >
    <TextField
      id="standard-multiline-flexible"
      label=" huh? what? huh? huh? what did you say? " 
      multiline
      maxRows = {4}
      fullWidth
      onChange={(e) => setIdeaText(e.target.value)}
      variant="standard" />

        <Stack direction="row"  spacing={5}  justifyContent="center" sx={{ mt: 10 }} >
         <UrgencyButton />
     </Stack>
  
    <Typography style={{fontFamily : 'monospace'}} variant="h4" gutterBottom>
        When'd You Want That?
      </Typography>   
    
        <Button variant ="contained" onClick = {saveIdea}>
            CLICK ME 🛏️ CLICK ME 🛏️
        </Button>

    <NewIdeaCalendar  />



      </Stack>
     
  </>
  );

}