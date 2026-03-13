import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function NewIdeaCalendar({ setSelectedRange }) {
  const handleDateClick = (info) => {
    setSelectedRange({
      start: info.dateStr,
      end: info.dateStr,
    });
  };

  const handleSelect = (info) => {
    const actualEnd = new Date(info.end);
    actualEnd.setDate(actualEnd.getDate() - 1);
    const fixedEnd = actualEnd.toLocaleDateString("en-CA");

    setSelectedRange({
      start: info.startStr,
      end: fixedEnd,
    });
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      selectable={true}
      dateClick={handleDateClick}
      select={handleSelect}
    />
  );
}