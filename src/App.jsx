
import { useState } from "react";
import { Stack, ButtonBase, Slide,  TextField, Table, TableBody , TableCell, TableContainer, TableHead,TableRow,Paper  } from "@mui/material";
import { Box } from "@mui/material";
import OldIdeaTable from "./components/OldIdeaTable";
import Calendar from "./components/Calendar";
import NewIdeaTF from "./components/NewIdeaTF";

//to make a button an image we show said image and wrap it in a clickable element assigning an onclick

export default function App() {
  //show xIDea determines if the field value is visible and setXidea changes that value , doing useState(false) starts it as false

  const [openSection, setOpenSection] = useState(null);

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

  return (
    //spacing is space inbetween the middle one and mt is the distance from top of page

    <>
      <Box
        component="img"
        src="/images/title.png"
        alt="Titlepageyay"
        sx={{ display: "block", margin: "0 auto", mt: 4, width: 800, maxWidth: "90%",  }}
      />
      <Box sx={{ mt: 10, width: "fit-content", mx: "auto" }}>
        
      <Stack   direction="row"  spacing={10}  justifyContent="center" sx={{ mt: 10 }} >
        {/*  ----------------------------------- First box  ----------------------------------- */}
          <ButtonBase onClick={() => handleSectionClick(openSection === "old" ? null : "old")}>
            <img
              src="/images/old_idea.png"
              alt="Old Ideas"
              style={{   width: 150,  height: 150, objectFit: "cover", display: "block",  }}
            />
          </ButtonBase>
                {/*  ----------------------------------- Second box -------------------------------------*/}
          <ButtonBase onClick={() => handleSectionClick(openSection === "new" ? null : "new")}>
            <img
              src="/images/new_idea.png"
              alt="New Idea"
              style={{   width: 150,  height: 150, objectFit: "cover", display: "block",  }}
            />
          </ButtonBase>
                {/*  ----------------------------------- Third box  ----------------------------------- */}
       
          <ButtonBase onClick={() => handleSectionClick(openSection === "dates" ? null : "dates")}>
            <img
              src="/images/dates.png"
              alt="Dates"
              style={{   width: 150,  height: 150, objectFit: "cover", display: "block",  }}
            />
          </ButtonBase>
          
          
      </Stack> 

        <Slide in={openSection !== null} timeout={{enter: 1500}}>
        <Box sx={{ mt: 3 }}>
          {openSection === "old" && <OldIdeaTable />}
          {openSection === "new" && <NewIdeaTF />}
          {openSection === "dates" && <Calendar />}
        </Box>
      </Slide>

      </Box>
    </>
  );
}
