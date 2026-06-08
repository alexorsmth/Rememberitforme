import { useState } from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/lora";

export default function ShopkeeperDialogue({ ideas }) {
  const [shopkeeperMessage, setShopkeeperMessage] = useState(
    "What's on your mind?"
  );

  const [dialogueIndex, setDialogueIndex] = useState(0);

  function handleShopkeeperDialogueClick() {
    if (ideas.length === 0) {
      const noIdeaMessages = [
        "Get to work!",
        "No ideas? Not even one?",
        "The shelf is empty...",
        "Come back when inspiration strikes.",
      ];

      const nextMessage =
        noIdeaMessages[dialogueIndex % noIdeaMessages.length];

      setShopkeeperMessage(nextMessage);
      setDialogueIndex(dialogueIndex + 1);
      return;
    }

    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];

    const ideaMessages = [
      `"${randomIdea.idea_meat}" sounds interesting, I guess...`,
      `When's the last time you thought about "${randomIdea.idea_meat}"?`,
      `Maybe "${randomIdea.idea_meat}" needs a little more care.`,
      `You still remember "${randomIdea.idea_meat}", right?`,
    ];

    const nextMessage = ideaMessages[dialogueIndex % ideaMessages.length];

    setShopkeeperMessage(nextMessage);
    setDialogueIndex(dialogueIndex + 1);
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: "100%", md: 800 },
        maxWidth: "100%",
        mx: "auto",
      }}
    >
      <Box
        component="img"
        src="/images/Shopkeeper1.png"
        alt="Shopkeeper"
        sx={{
          width: "100%",
          display: "block",
          mt:5,
        }}
      />

      <Box
        onClick={handleShopkeeperDialogueClick}
        sx={{
          position: "absolute",

          left: "10%",
          bottom: "11%",
          width: "100%",
          height: "30%",

          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          px: 2,
          boxSizing: "border-box",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontFamily: "Lora",
            fontSize: { xs: "12px", md: "20px" },
            lineHeight: 1.15,
            userSelect: "none",
          }}
        >
          {shopkeeperMessage}
        </Typography>
      </Box>
    </Box>
  );
}