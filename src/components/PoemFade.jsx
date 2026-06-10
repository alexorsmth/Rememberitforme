import { useState, useEffect } from "react";
import { Box, Typography, Fade } from "@mui/material";

export default function PoemFade() {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  return (
    <Box
      component="header"
      sx={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        backgroundColor: "#e3d6d6",
        borderBottom: "1px solid black",
      }}
    >
      <Typography
        component="div"
        sx={{
          fontFamily: "Lora",
          fontSize: "17px",
          color: "#c93e3e",
          textAlign: "center",
          mt: 2,
          mb: 2,
        }}
      >
        <Fade in={showFirst} timeout={2000}>
          <Box component="span" sx={{ display: "block" }}>
            I want a hot dog
          </Box>
        </Fade>

        <Fade in={showSecond} timeout={2000}>
          <Box component="span" sx={{ display: "block" }}>
            Grilled on a charcoal fire
          </Box>
        </Fade>

        <Fade in={showThird} timeout={2000}>
          <Box component="span" sx={{ display: "block" }}>
            Juicy dog goodness
          </Box>
        </Fade>
      </Typography>
    </Box>
  );
}
