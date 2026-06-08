import Tooltip from "@mui/material/Tooltip";
//hovering over something itll tell you how to delete something 
//obtains the title from OldIdeaPage and spans only the idea name
export default function DescToolTip({ text }) {
  const snippet = "Hold for 3 seconds to delete! :D"
  return (
    <Tooltip title={snippet} arrow>
      <span>{text}</span>
    </Tooltip>
  );
}
