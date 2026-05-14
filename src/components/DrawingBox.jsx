import { useRef, useState, useEffect } from "react";
import { Box, Button, Stack, ButtonBase, TextField } from "@mui/material";

export default function DrawingBox({ box, onChange, onDelete }) {
  const canvasRef = useRef(null);
  const [description, setDescription] = useState(box.description || "");
  const [isDrawing, setIsDrawing] = useState(false);
  const [erasing, setErase] = useState(false);

  useEffect(() => {
    if (!box.drawingImage) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();

    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    image.src = box.drawingImage;
  }, [box.drawingImage]);

  //get mouse position accurately so drawing doesnt suck
  function getMousePosition(event) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }
  //the beginning of the drawing need to position the "cursor" to where it needs to be kinda and also toggles is drawing
  function startDrawing(event) {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { x, y } = getMousePosition(event);

    context.beginPath();
    context.moveTo(x, y);

    setIsDrawing(true);
  }

  //actually draws can set generally the size and stuff of the pen
  function draw(event) {
    if (!isDrawing) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const { x, y } = getMousePosition(event);

    context.lineTo(x, y);

    context.strokeStyle = erasing ? "white" : "black";
    context.lineWidth = erasing ? 6 : 1;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }

 


//clears the canvas 
  function clearCanvas() {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    onChange({
      ...box,
      description: description,
      drawingImage: "",
    });
  }
//update description of the step whenever you update the thing i guess
function updateDescription(newDescription) {
  setDescription(newDescription);

  onChange({
    ...box,
    description: newDescription,
  });
}

function saveDrawingImage() {
  const canvas = canvasRef.current;
  const drawingImage = canvas.toDataURL("image/png");

  onChange({
    ...box,
    description: description,
    drawingImage: drawingImage,
  });
}//stopDrawing 
  function stopDrawing() {
    if (!isDrawing) {
      return;
    }
    setIsDrawing(false);
    saveDrawingImage();
  }

  const iconImg = erasing ? "/images/Pencil.png" : "/images/eraser.png";

  return (
    <Stack spacing={2} alignItems="center">
      <Box
        component="canvas"
        ref={canvasRef}
        width={500}
        height={300}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        sx={{
          width: 500,
          height: 300,
          border: "2px solid black",
          backgroundColor: "white",
          cursor: erasing ? "cell" : "crosshair",
        }}
      />
      <Stack
        direction="row"
        spacing={4}
        alignItems="flex-start"
        justifyContent="center"
        sx={{ mt: 8 }}
      >
        <ButtonBase onClick={() => setErase((prev) => !prev)}>
          <img
            src={iconImg}
            alt="Old Ideas"
            className="menu-button"
            width={60}
            height={60}
          />
        </ButtonBase>

        <ButtonBase onClick={onDelete}>
          <img
            src="./images/Trash bin.png"
            alt="Old Ideas"
            className="menu-button"
            width={60}
            height={60}
          />
        </ButtonBase>

        <Button
        sx = {{
           fontFamily: "monospace", fontSize: "15px",  border: "3px solid black",
           bgcolor: '#dc2c2c', color: '#ffffff',
           boxShadow: 4
        }}
         variant="outlined"
         
         onClick={clearCanvas}>
          Clear Drawing
        </Button>
      </Stack>

      <TextField
        id="outlined-multiline-static"
        label="Description"
        multiline
        maxRows={4}
        fullWidth
        value={description}
        onChange={(e) => updateDescription(e.target.value)}
        variant="standard"
      />
    </Stack>
  );
}
