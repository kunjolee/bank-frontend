import { ThemeProvider, CssBaseline} from '@mui/material';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './main.css';
import { darkTheme, lightTheme } from './themes/'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline/>
    <ThemeProvider theme={ lightTheme } >
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
