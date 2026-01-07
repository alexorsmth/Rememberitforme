import Typography from "@mui/material/Typography";

export default function Title({ text = "My Title", variant = "h4" }) {
  return (
    <Typography variant={variant} component="h1" gutterBottom>
      {text}
    </Typography>
  );
}
