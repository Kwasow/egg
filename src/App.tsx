import React from 'react'
import { AppBar, Box, Toolbar } from '@mui/material'
import { appBarStyle } from './utils/Styles'
import Logo from './assets/images/logo.png'
import './App.css'

function App() {
  return <>
    <AppBar position='static'>
      <Toolbar style={appBarStyle}>
        <Box
            component="img"
            sx={{ height: 90 }}
            alt='Logo czwartego weekendu z ginekologią'
            src={Logo} />
        <p className='appbar-name'>
          IV Weekend z ginekologią<br></br>
          Sekrety onkologii
        </p>
      </Toolbar>
    </AppBar>
  </>
}

export default App
