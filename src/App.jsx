import { useState, useEffect } from "react";
import { Stack, ButtonBase, Slide, Box, Dialog, DialogTitle, DialogContent } from "@mui/material";

import OldIdeaTable from "./components/OldIdeaTable";
import Calendar from "./components/Calendar";
import NewIdeaTF from "./components/NewIdeaTF";
import "./App.css";

const STORAGE_KEY = "ideas"; // we write this so we can just write  SOTRAGE_KEY instead of "ideas" as we only have to rename that one variable 

// to make a button an image we show said image and wrap it in a clickable element assigning an onclick


//main react component
export default function App() {

  const [openSection, setOpenSection] = useState(null);
  const [ideas, setIdeas] = useState([]);
  //here we have a react concept with useStates 
  //for example, ideas = current saved ideas, and set ideas  is the function that chaines said ideas 

  const handleSectionClick = (section) => {
    if (openSection === section) {
      setOpenSection(null);
      return;
    }

    if (openSection !== null) {
      setOpenSection(null);

      setTimeout(() => {
        setOpenSection(section);
      }, 300);
    } else {
      setOpenSection(section);
    }
  };

   function fetchIdeas() {
    const savedIdeas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setIdeas(savedIdeas);
  }
//over here, use effects runs code from when the component first loads so the idea is we initally load ideas from our local storage 
  useEffect(() => {
    fetchIdeas();
  }, []);

  // this part changes idea data into calendar data
  // title, start, and end are fields FullCalendar understands
  const calendarEvents = ideas.map((idea) => ({
    id: idea.id,
    title: idea.idea_meat,
    start: idea.idea_start,
    end: idea.idea_end,
  }));

  return (
    <>
      <Box
        component="img"
        src="/images/title.png"
        alt="Titlepageyay"
        sx={{
          display: "block",
          margin: "0 auto",
          mt: 4,
          width: 800,
          maxWidth: "90%",
        }}
      />

      <Box sx={{ mt: 10, width: "fit-content", mx: "auto" }}>
        <Stack
          direction="row"
          spacing={10}
          justifyContent="center"
          sx={{ mt: 10 }}
        >
          {/* First box: old ideas */}
          <ButtonBase
            onClick={() => handleSectionClick(openSection === "old" ? null : "old")}
          >
            <img
              src="/images/old_idea.png"
              alt="Old Ideas"
              className="menu-button"
            />
          </ButtonBase>

          {/* Second box: new idea */}
          <ButtonBase
            onClick={() => handleSectionClick(openSection === "new" ? null : "new")}
          >
            <img
              src="/images/new_idea.png"
              alt="New Idea"
              className="menu-button"
            />
          </ButtonBase>

          {/* Third box: dates */}
          <ButtonBase
            onClick={() =>
              handleSectionClick(openSection === "dates" ? null : "dates")
            }
          >
            <img
              src="/images/dates.png"
              alt="Dates"
              className="menu-button"
            />
          </ButtonBase>
        </Stack>

        <Slide in={openSection !== null} timeout={{ enter: 1500 }}>
          <Box sx={{ mt: 3 }}>
            {openSection === "old" && <OldIdeaTable ideas={ideas} />}
            {openSection === "new" && <NewIdeaTF onIdeaSaved={fetchIdeas} />}
            {openSection === "dates" && <Calendar events={calendarEvents} />}
          </Box>
        </Slide>
      </Box>
    </>
  );
}