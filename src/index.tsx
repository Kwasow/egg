import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import { eggTheme } from './utils/MUITheme';

import './index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={eggTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
