import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../App.css";
export default function DatesCalendar({ events }) {
  return (
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
  );
}
