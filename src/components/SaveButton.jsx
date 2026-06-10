import { useState } from "react";
import { Box, Typography, ButtonBase, Fade } from "@mui/material";
import "@fontsource/lora";

export default function SaveIdeaDialogue({ onSaveIdea }) {
  const defaultMessage = "Do you want to submit your idea..?";

  const [message, setMessage] = useState(defaultMessage);
  const [showMessage, setShowMessage] = useState(true);

  function changeMessageTemporarily(newMessage) {
    setShowMessage(false);

    setTimeout(() => {
      setMessage(newMessage);
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);

        setTimeout(() => {
          setMessage(defaultMessage);
          setShowMessage(true);
        }, 500);
      }, 2000);
    }, 500);
  }

  function handleYes() {
    onSaveIdea();
    changeMessageTemporarily("Thank you!!");
  }

  function handleNo() {
    changeMessageTemporarily("Perhaps another time...");
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "520px",
        maxWidth: "100%",
        ml: 5,
        mt: 10,
      }}
    >
      <Box
        component="img"
        src="/images/SaveIdea1.png"
        alt="Save idea dialogue box"
        sx={{
          width: "100%",
          display: "block",
        }}
      />

      <Fade in={showMessage} timeout={500}>
        <Typography
          sx={{
            position: "absolute",
            top: "48px",
            left: "120px",
            right: "40px",

            color: "white",
            fontFamily: "Lora",
            fontSize: "32px",
            lineHeight: 1,
          }}
        >
          {message}
        </Typography>
      </Fade>

      <Box
        sx={{
          position: "absolute",
          left: "105px",
          bottom: "50px",

          display: "flex",
          gap: 5,
        }}
      >
        <ButtonBase
          onClick={handleYes}
          sx={{
            color: "white",
            fontFamily: "Lora",
            fontSize: "30px",
            px: 1,

            "&:hover": {
              color: "#e0d500",
              transform: "translateY(-2px)",
            },

            transition: "color 0.2s ease, transform 0.2s ease",
          }}
        >
          ♥ Yes
        </ButtonBase>

        <ButtonBase
          onClick={handleNo}
          sx={{
            color: "white",
            fontFamily: "Lora",
            fontSize: "30px",
            px: 1,

            "&:hover": {
              color: "#c93e3e",
              transform: "translateY(-2px)",
            },

            transition: "color 0.2s ease, transform 0.2s ease",
          }}
        >
          ♥ No
        </ButtonBase>
      </Box>
    </Box>
  );
}
