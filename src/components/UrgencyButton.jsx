import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { pink, lightBlue, lightGreen } from "@mui/material/colors";

const label = { slotProps: { input: { "aria-label": "default" } } };

export default function CheckboxLabels({ urgency, setUrgency }) {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={urgency === "School Work"}
            onChange={() => setUrgency("School Work")}
            {...label}
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 45 },
              color: pink[600],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
        }
        label="School Work"
        labelPlacement="bottom"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={urgency === "Passions"}
            onChange={() => setUrgency("Passions")}
            {...label}
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 45 },
              color: lightBlue[600],
              "&.Mui-checked": {
                color: lightBlue[600],
              },
            }}
          />
        }
        label="Passions"
        labelPlacement="bottom"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={urgency === "Kinda Important"}
            onChange={() => setUrgency("Kinda Important")}
            {...label}
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 45 },
              color: lightGreen[600],
              "&.Mui-checked": {
                color: lightGreen[600],
              },
            }}
          />
        }
        label="Kinda Important"
        labelPlacement="bottom"
      />
    </FormGroup>
  );
}
