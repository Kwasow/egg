import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import App from './App'
import { eggTheme } from './utils/MUITheme'
import { BrowserRouter } from 'react-router-dom'

import './utils/i18n'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './utils/redux/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={eggTheme}>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
