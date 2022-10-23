import { createTheme } from '@mui/material';


export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#c7102e',
        },
        secondary: {
            main: '#fff'
        }    
    },
    components: {
        MuiButton: {
            defaultProps:{
                color: 'primary',  
            },
        },
        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontSize: 30,
                    fontWeight: 600
                },
                h2: {
                    fontSize: 20,
                    fontWeight: 400
                },
                subtitle1: {
                    fontSize: 18,
                    fontWeight: 600
                }
            }
        }
    }
})