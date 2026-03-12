import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { pink,lightBlue,lightGreen } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'; //not urgent
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';// urgent
import WhatshotIcon from '@mui/icons-material/Whatshot'; //so very urgent

const label = { slotProps: { input: { 'aria-label': 'default' } } };

export default function CheckboxLabels() {
  return (
    
     <FormGroup  row>
      <FormControlLabel
  control={
    <Checkbox
      {...label}
      sx={{
        '& .MuiSvgIcon-root': { fontSize: 30 },
        color: pink[600],
        '&.Mui-checked': {
          color: pink[600],
        },
      }}
    />
  }

  label="VERY URGENT"
  sx={{
        '& .MuiFormControlLabel-label': {
          fontFamily: 'fangsong', // Change the font family
          fontWeight: 'bold',   // Change the font weight
        }, }}
  labelPlacement="bottom"
 
/>

  
      <FormControlLabel
  control={
    <Checkbox
      {...label}
      sx={{
        '& .MuiSvgIcon-root': { fontSize: 30 },
        color: lightBlue[600],
        '&.Mui-checked': {
          color: lightBlue[600],
        },
      }}
    />
  }
  label="Valued"
  labelPlacement="bottom"
/>

      <FormControlLabel
  control={
    <Checkbox
      {...label}
      sx={{
        '& .MuiSvgIcon-root': { fontSize: 30 },
        color: lightGreen[600],
        '&.Mui-checked': {
          color: lightGreen[600],
        },
      }}
    />
  }
  label="Chilling"
  labelPlacement="bottom"
/>

    </FormGroup>
   
  );
}