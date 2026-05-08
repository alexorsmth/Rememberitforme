import { useState } from "react";
import {
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";

const LABELS_STORAGE_KEY = "labels";

export default function LabelSelect({ selectedLabel, setSelectedLabel }) {
  const [labels, setLabels] = useState(() => {
    return JSON.parse(localStorage.getItem(LABELS_STORAGE_KEY)) || [];
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newLabelName, setNewLabelName] = useState("");

  function handleSelectChange(event) {
    const value = event.target.value;

    if (value === "add-new-label") {
      setDialogOpen(true);
      return;
    }

    setSelectedLabel(value);
  }

  function handleSaveNewLabel() {
    if (newLabelName.trim() === "") {
      return;
    }

    const cleanedName = newLabelName.trim();
    const updatedLabels = [...labels, cleanedName];

    setLabels(updatedLabels);
    localStorage.setItem(LABELS_STORAGE_KEY, JSON.stringify(updatedLabels));

    setSelectedLabel(cleanedName);
    setNewLabelName("");
    setDialogOpen(false);
  }

  return (
    <>
      <TextField
        select
        label="Choose Label"
        value={selectedLabel}
        onChange={handleSelectChange}
        fullWidth
      >
        {labels.map((label) => (
          <MenuItem key={label} value={label}>
            {label}
          </MenuItem>
        ))}

        <MenuItem value="add-new-label">+ Add new label</MenuItem>
      </TextField>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Create New Label....</DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, width: 300 }}>
            <TextField
              label="Label name"
              value={newLabelName}
              onChange={(e) => setNewLabelName(e.target.value)}
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveNewLabel}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
