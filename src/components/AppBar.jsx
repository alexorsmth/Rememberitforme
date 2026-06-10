import { Box, Typography, Fade } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "@fontsource/lora";
export default function TopHeader() {
  return (
    //fulll width black bar 
    <Box
      component="header"
      sx={{
        width: "100vw", //vw is whole browser window
        marginLeft: "calc(50% - 50vw)", 
        marginRight: "calc(50% - 50vw)",
        backgroundColor: "black",
        borderTop: "2px solid white",
        borderBottom: "2px solid white",
      }}
    >
      <Box 
        sx={{
          height: "80px",
          px: { xs: 2, md: 4 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
        //work this one for the content inside the header bar (basically how its arranged)
      >
        <Fade in={true} timeout={1700}>
          <Typography
            sx={{
              fontWeight: 300,
              fontSize: "17px",
              color: "white",
              fontFamily: "Lora",
            }}
          >
            Saving Idea...
          </Typography>
        </Fade>
      </Box>
    </Box>
  );
}
