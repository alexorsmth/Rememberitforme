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
import "../App.css";
const LABELS_STORAGE_KEY = "labels";

export default function LabelSelect({ selectedLabel, setSelectedLabel }) {
  const [labels, setLabels] = useState(() => {
    return JSON.parse(localStorage.getItem(LABELS_STORAGE_KEY)) || [];
  });
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newLabelName, setNewLabelName] = useState("");
  const [deleteLabel, setDeleteLabel] = useState("");

  function handleSelectChange(event) {
    const value = event.target.value;

    if (value === "add-new-label") {
      setCreateDialogOpen(true);
      return;
    } else if (value === "remove-label") {
      setDeleteDialogOpen(true);
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
    setCreateDialogOpen(false);
  }

  function handleDeleteLabel() {
    if (deleteLabel.trim() === "") {
      return;
    }

    const updatedLabels = labels.filter((label) => label !== deleteLabel);
    setLabels(updatedLabels);
    localStorage.setItem(LABELS_STORAGE_KEY, JSON.stringify(updatedLabels));

    setDeleteLabel("");
    setDeleteDialogOpen(false);
  }

  return (
    <>
      <TextField
        select
        label="Choose Label"
        value={selectedLabel}
        className="label-select"
        onChange={handleSelectChange}
        fullWidth
      >
        {labels.map((label) => (
          <MenuItem key={label} value={label}>
            {label}
          </MenuItem>
        ))}
        {/*create label here*/}
        <MenuItem value="add-new-label">Add new label +++</MenuItem>
        {/*remove label here*/}
        <MenuItem value="remove-label">Remove a Label ---</MenuItem>
      </TextField>

      {/*Create label dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
      >
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
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveNewLabel}>Save</Button>
        </DialogActions>
      </Dialog>

      {/*delete label dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete A Label....</DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, width: 300 }}>
            <TextField
              select
              label="Choose label to delete"
              value={deleteLabel}
              onChange={(e) => setDeleteLabel(e.target.value)}
              fullWidth
            >
              {labels.map((label) => (
                <MenuItem key={label} value={label}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteLabel}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
