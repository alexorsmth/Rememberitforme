import { Box, ButtonBase, Typography } from "@mui/material";

export default function FloatingActionCards({ onUpdate, onCreate, onDates }) {
  const cards = [
    {
    
      image: "/images/Updationidea.png",
      onClick: onUpdate,
    },
    {
      
      image: "/images/CreationIdea.png",
      onClick: onCreate,
    },
    {
      
      image: "/images/DateIdea.png",
      onClick: onDates,
    },
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        left: "50%",
        bottom: "32px",
        transform: "translateX(-50%)",
        zIndex: 9999,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        "&:hover .floating-card": {
          mx: 2,
          transform: "translateY(-18px) scale(1.08)",
          opacity: 1,
        },
      }}
    >
      {cards.map((card, index) => (
        <ButtonBase
          key={card.label}
          onClick={card.onClick}
          className="floating-card"
          sx={{
            width: 105,
            height: 105,
            mx: -1.5,
            border: "1px solid #4c8aa5",
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            overflow: "hidden",

            transition:
              "transform 0.28s ease, margin 0.28s ease, opacity 0.28s ease",
            transform: "translateY(0) scale(1)",
            opacity: 1,

            zIndex: cards.length - index,

            "&:hover": {
              transform: "translateY(-30px) scale(1.16) !important",
              borderColor: "#e0d500",
            },
          }}
        >
          <Box
            component="img"
            src={card.image}
            alt={card.label}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <Typography
            sx={{
              position: "absolute",
              bottom: 5,
              left: 0,
              right: 0,
              color: "white",
              fontSize: "22px",
              fontFamily: "Lora",
              textShadow: "2px 2px 2px black",
              pointerEvents: "none",
            }}
          >
            {card.label}
          </Typography>
        </ButtonBase>
      ))}
    </Box>
  );
}