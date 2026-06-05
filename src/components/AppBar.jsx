import { Box, Typography, IconButton, Fade } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "@fontsource/lora"; 
export default function TopHeader() {
  return (
    <Box
      component="header"
      sx={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        backgroundColor: "black",
        borderBottom: "1px solid Black",
      }}
    >
      <Box
        sx={{
          height: "64px",
          px: { xs: 2, md: 4 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <Fade in={true} timeout={1700}>
        <Typography
          sx={{
            fontWeight: 300,
            fontSize: "17px",
            color: "white",
            fontFamily: "Lora"
          }}
        >
          Saving...
        </Typography>
        </Fade>

        <IconButton sx={{ color: "black" }}>
          <MenuIcon />
        </IconButton>
      </Box>
    </Box>
  );
}