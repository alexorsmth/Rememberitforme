import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction'; // for selectable

export default function DatesCalendar() {

    const bedClicked = (clickMeBEDEMOJI) => {
        alert("start:" +clickMeBEDEMOJI.startStr);
        alert("end:"+ clickMeBEDEMOJI.endStr);
    };
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      selectable= {true}
      select = {bedClicked}
    />
  );
}