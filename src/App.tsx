import React from 'react'
import { AppBar, Box, Toolbar } from '@mui/material'
import Logo from './assets/images/logo.png'
import './App.css'

function App() {
  return <>
    <AppBar position='static'>
      <Toolbar sx={{ height: 100 }}>
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
