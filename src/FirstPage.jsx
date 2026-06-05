import { useState, useEffect } from "react";
import {
  Stack,
  ButtonBase,
  Slide,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Fade,
} from "@mui/material";

import OldIdeaTable from "./components/OldIdeaPage";
import Calendar from "./components/Calendar";
import NewIdeaTF from "./components/NewIdeaPage";
import UpdateIdeaPage from "./components/UpdateIdeaPage";
import "./App.css";
import TopHeader from "./components/AppBar";
import FloatingActionCards from "./components/FloatingCard";
const STORAGE_KEY = "ideas"; // we write this so we can just write  SOTRAGE_KEY instead of "ideas" as we only have to rename that one variable

// to make a button an image we show said image and wrap it in a clickable element assigning an onclick

//main react component
export default function FirstPage() {
  const [openSection, setOpenSection] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [selectIdea, setSelectIdea] = useState(null);
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);

  useEffect(() => {
    setShowFirst(true);

    const secondTimer = setTimeout(() => {
      setShowSecond(true);
    }, 900);

    const thirdTimer = setTimeout(() => {
      setShowThird(true);
    }, 1800);

    return () => {
      clearTimeout(secondTimer);
      clearTimeout(thirdTimer);
    };
  }, []);

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
      <TopHeader />
      <box>
        <Typography
          component="div"
          sx={{
            fontFamily: "Lora",
            fontSize: "17px",
            color: "#c93e3e",
            textAlign: "center",
            mt: 5,
          }}
        >
          <Fade in={showFirst} timeout={2000}>
            <Box component="span" sx={{ display: "block" }}>
              nurture a vision
            </Box>
          </Fade>

          <Fade in={showSecond} timeout={2000}>
            <Box component="span" sx={{ display: "block" }}>
              blossom to reality
            </Box>
          </Fade>

          <Fade in={showThird} timeout={2000}>
            <Box component="span" sx={{ display: "block" }}>
              curate your idea
            </Box>
          </Fade>
        </Typography>
      </box>
      <FloatingActionCards
      onUpdate={() => setOpenSection("old")}
      onCreate={() => setOpenSection("new")}
      onDates={() => setOpenSection("dates")}
    />

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
                width: { xs: "100%", md: 800 },
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
                <UpdateIdeaPage idea={selectIdea} onIdeasChanged={fetchIdeas} />
              )}
            </Box>
          </Slide>
        </Box>
      
    </>
  );
}
