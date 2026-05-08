import { useRef, useState } from "react";
import { Box, Button, Stack, ButtonBase, TextField } from "@mui/material";

export default function DrawingBox() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [erasing, setErase] = useState(false);

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

  function startDrawing(event) {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const { x, y } = getMousePosition(event);

    context.beginPath();
    context.moveTo(x, y);

    setIsDrawing(true);
  }

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



  function stopDrawing() {
    setIsDrawing(false);
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
    const iconImg = erasing ? "/images/Pencil.png"  :  "/images/eraser.png"
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
        spacing={6}
        alignItems="flex-start"
        justifyContent="center"
        sx={{ mt: 8 }}
      >

          <ButtonBase 
             onClick={() =>setErase((prev) => !prev)}
              >
            <img
              src= {iconImg}
              alt="Old Ideas"
              className="menu-button"
              width={40}
              height={40}
            />
          </ButtonBase>
        
        <Button variant="outlined" onClick={clearCanvas}>
          Clear Drawing
        </Button>
      </Stack>
      <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          maxRows={4}
          fullWidth
         // value={saving here}
          variant="standard"
        />
    </Stack>
  );
}
