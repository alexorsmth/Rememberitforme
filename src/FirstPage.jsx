import { useState, useEffect } from "react";
import { Stack, Slide, Box } from "@mui/material";

import OldIdeaTable from "./components/UpdateIdeaTable";
import Calendar from "./components/Calendar";
import NewIdeaTF from "./components/NewIdeaPage";
import UpdateIdeaPage from "./components/UpdateIdeaPage";
import "./App.css";
import TopHeader from "./components/AppBar";
import FloatingActionCards from "./components/FloatingCard";
import PoemFade from "./components/PoemFade";
const STORAGE_KEY = "ideas"; // we write this so we can just write  SOTRAGE_KEY instead of "ideas" as we only have to rename that one variable

// to make a button an image we show said image and wrap it in a clickable element assigning an onclick

//main react component
export default function FirstPage() {
  const [openSection, setOpenSection] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [selectIdea, setSelectIdea] = useState(null);

  function fetchIdeas() {
    const savedIdeas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setIdeas(savedIdeas);
  }
  //over here, use effects runs code from when the component first loads so the idea is we initally load ideas from our local storage
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchIdeas();
  }, []);

  const calendarEvents = ideas.map((idea) => ({
    id: idea.id,
    title: idea.idea_meat,
    start: idea.idea_start,
    end: idea.idea_end,
  }));

  return (
    <>
      <Stack
        direction="column"
        alignItems="center"
        sx={{
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <TopHeader />
        <PoemFade alignContent="center" />

        {openSection === null && (
          <Box
            component="img"
            src="/images/Shopkeeper1.png"
            alt="Shopkeeper"
            sx={{
              width: { xs: "100%", md: 800 },
              maxWidth: "100%",
              display: "block",
              mx: "auto",
            }}
          />
        )}

        <Slide in={openSection !== null} timeout={{ enter: 800 }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: openSection === "dates" ? "1100px" : "900px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {openSection === "old" && (
              <OldIdeaTable
                ideas={ideas}
                onIdeaSelect={(idea) => {
                  setSelectIdea(idea);
                  setOpenSection("ideaDetails");
                }}
                onIdeasChanged={fetchIdeas}
              />
            )}

            {openSection === "new" && <NewIdeaTF onIdeaSaved={fetchIdeas} />}

            {openSection === "dates" && <Calendar events={calendarEvents} />}

            {openSection === "ideaDetails" && (
              <UpdateIdeaPage idea={selectIdea} onIdeasChanged={fetchIdeas} />
            )}
          </Box>
        </Slide>
      </Stack>

      <FloatingActionCards
        onUpdate={() => setOpenSection("old")}
        onCreate={() => setOpenSection("new")}
        onDates={() => setOpenSection("dates")}
      />
    </>
  );
}
