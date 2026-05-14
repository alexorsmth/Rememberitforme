import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../App.css";
export default function DatesCalendar({ events }) {
  return (
    <FullCalendar
      
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      className = "fc-theme-standar td"
      titleFormat={{
        year: "numeric",
        month: "short",
      }}
    />
  );
}