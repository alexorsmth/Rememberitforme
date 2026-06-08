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

  const middle = (cards.length - 1) / 2;
  const rotateXValues = [10, 360, 10];
  return (
    <Box
      sx={{
        position: "fixed",
        left: "50%",
        bottom: "32px",
        transform: "translateX(-50%)",
        zIndex: 9999,

        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",

        perspective: "900px",

        "&:hover .floating-card": {
          mx: 2,
          transform: "rotateX(0deg) rotateY(0deg) translateY(-18px) scale(1.05)",
          opacity: 2,
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
            mx: -4.5,

            position: "relative",
            overflow: "hidden",

            border: "4px solid #00bbff",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            boxShadow: "0 12px 18px rgba(68, 68, 68, 0.45)",

            transformOrigin: "center center",

            transform: `
              rotateX(${rotateXValues[index]}deg)
              rotateY(${(index - middle) * 360}deg)
              translateY(15px)
              scale(0.95)
            `,

            opacity: 1,

            transition:
              "transform 0.32s ease, margin 0.32s ease, opacity 0.32s ease, border-color 0.32s ease",

            zIndex: index + 1,

            "&:hover": {
              transform:
                "rotateX(0deg) rotateY(0deg) translateY(-42px) scale(1.18) !important",
              borderColor: "#e0d500",
              zIndex: 99,
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
              display: "block",
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
              textAlign: "center",
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