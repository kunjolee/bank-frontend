import { createTheme } from "@mui/system";

import { red } from '@mui/material/colors'

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        error: {
            main: red.A400
        }
    },
});