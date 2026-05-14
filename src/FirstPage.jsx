import { useState, useEffect } from "react";
import {
  Stack,
  ButtonBase,
  Slide,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import OldIdeaTable from "./components/OldIdeaPage";
import Calendar from "./components/Calendar";
import NewIdeaTF from "./components/NewIdeaPage";
import UpdateIdeaPage from "./components/UpdateIdeaPage";
import "./App.css";

const STORAGE_KEY = "ideas"; // we write this so we can just write  SOTRAGE_KEY instead of "ideas" as we only have to rename that one variable

// to make a button an image we show said image and wrap it in a clickable element assigning an onclick

//main react component
export default function FirstPage() {
  const [openSection, setOpenSection] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [selectIdea, setSelectIdea] = useState(null);

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
        src="/images/TitleThing.png"
        alt="Titlepageyay"
        sx={{
          display: "block",
          width: 800,
          maxWidth: "90%",
          mx: "auto",
          mt: 4,
        }}
      />
      {/* This is the stuff that makes it sit to the right of the buttons */}
      <Stack
        direction="row"
        spacing={6}
        alignItems="flex-start"
        justifyContent="center"
        sx={{ mt: 8 }}
      >
        {/* Left side buttons */}
        <Stack direction="column" spacing={1}>
          <ButtonBase onClick={() => handleSectionClick("old")}>
            <img
              src="/images/Updationidea.png"
              alt="Old Ideas"
              className="menu-button"
              style={{
                width: "200px",
                height: "200px",
              }}
            />
          </ButtonBase>

          <ButtonBase onClick={() => handleSectionClick("new")}>
            <img
              src="/images/CreationIdea.png"
              alt="New Idea"
              className="menu-button"
              style={{
                width: "200px",
                height: "200px",
              }}
            />
          </ButtonBase>

          <ButtonBase onClick={() => handleSectionClick("dates")}>
            <img
              src="/images/DateIdea.png"
              style={{
                width: "200px",
                height: "200px",
              }}
              alt="Dates"
              className="menu-button"
            />
          </ButtonBase>
        </Stack>

        {/* Right side red/content box */}
        <Box
          sx={{
            width: 800,
            minHeight: 500,
            p: 3,
          }}
        >
          {openSection === null && (
            <Box
              component="img"
              src="/images/Shopkeeper1.png"
              alt="Shopkeeper"
              sx={{
                width: 800,
                maxWidth: "100%",
                display: "block",
                mx: "auto",
                
              }}
            />
          )}
          <Slide in={openSection !== null} timeout={{ enter: 800 }}>
            <Box>
              {openSection === "old" && (
                <OldIdeaTable
                  ideas={ideas}
                  onIdeaSelect={(idea) => {
                    //this right here is a function, giving oldIdeaTable a function, saying when you pick an idea,
                    setSelectIdea(idea); //this stores the idea
                    setOpenSection("ideaDetails"); //this changes the visible section of the detail page
                  }}
                  onIdeasChanged={fetchIdeas}
                />
              )}

              {openSection === "new" && <NewIdeaTF onIdeaSaved={fetchIdeas} />}
              {openSection === "dates" && <Calendar events={calendarEvents} />}
              {openSection === "ideaDetails" && (
                <UpdateIdeaPage idea={selectIdea} />
              )}
            </Box>
          </Slide>
        </Box>
      </Stack>
    </>
  );
}
