import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function DatesCalendar({ events }) {
  return (
    <FullCalendar
      
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      titleFormat={{
        year: "numeric",
        month: "short",
      }}
    />
  );
}