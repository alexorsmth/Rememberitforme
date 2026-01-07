import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function buttons() {
    return(
         <Stack spacing={2} direction="row">
            <Button variant="contained">Text</Button>
            <Button variant="contained">Text</Button>
            <Button variant="contained">Text</Button>
         </Stack>
    )


}