import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';

import { ThemeProvider, CssBaseline} from '@mui/material';
import { SnackbarProvider } from "notistack";
import App from './App'
import { darkTheme, lightTheme } from './themes/';
import { store } from './store';


import './main.css';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline/>
    <ThemeProvider theme={ lightTheme } >
      <Provider store={ store }>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
 </React.StrictMode>
)
