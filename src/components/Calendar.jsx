import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {

  Box,
} from "@mui/material";
import "../App.css";
export default function DatesCalendar({ events }) {
  return (

    <Box
  sx={{
    width: "80%",
    p: 6,

    boxSizing: "border-box",
  }}
>
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      //change this up for different date formats
      titleFormat={{
        year: "numeric",
        month: "short",
      }}
    />
    </Box>
  );
}
