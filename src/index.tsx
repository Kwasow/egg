import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import App from './App'
import { eggTheme } from './utils/MUITheme'
import { BrowserRouter } from 'react-router-dom'

import './utils/i18n'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={eggTheme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
