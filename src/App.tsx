import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function App() {
  return <view>
    <AppBar className='navigation-bar' position='static'>
      <Toolbar variant='dense'>
        <Typography variant='h6' color='inherit' component='div'>
          Photos
        </Typography>
      </Toolbar>
    </AppBar>
  </view>
}

export default App
