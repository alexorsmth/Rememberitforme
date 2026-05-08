import Tooltip from "@mui/material/Tooltip";

export default function DescToolTip({ text, ideaDesc }) {
  const snippet =
    ideaDesc && ideaDesc.length > 80
      ? ideaDesc.slice(0, 80) + "..."
      : ideaDesc || "No description";

  return (
    <Tooltip title={snippet} arrow>
      <span>{text}</span>
    </Tooltip>
  );
}
