import React from 'react'
import { AppBar, Box, Tabs, Tab } from '@mui/material'
import Logo from '../assets/images/logo.png'
import { ThemeProvider } from '@mui/system'
import { EggToolbar, navigationTabsTheme } from '../utils/MUITheme'
import { useNavigate } from 'react-router-dom'
import './NavigationBar.css'

const siteList = ['/home', '/program', '/speakers', '/sponsors', '/photos']

function a11yProps(index: number) {
  return {
    id: `navigation-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function checkRoute(route: string) {
  const index = siteList.findIndex((value: string) => {
    return route === value
  })
  
  if (index !== -1) {
    return index
  }

  return false
}

function NavigationTabs(props: {
  route: string,
}) {
  const [value, setValue] = React.useState(props.route)
  const navigate = useNavigate()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate(siteList[newValue])
    setValue(siteList[newValue])
  }

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <ThemeProvider theme={navigationTabsTheme}>
          <Tabs value={checkRoute(value)} onChange={handleChange} >
            <Tab label='Aktualności' {...a11yProps(0)} />
            <Tab label='Program' {...a11yProps(1)} />
            <Tab label='Mówcy i organizatorzy' {...a11yProps(2)} />
            <Tab label='Sponsorzy' {...a11yProps(3)} />
            <Tab label='Galeria' {...a11yProps(4)} />
          </Tabs>
        </ThemeProvider>
      </Box>
    </Box>
  )
}

function NavigationBar(props: {
  route: string
}) {
  return <>
    <AppBar position='fixed'>
      <EggToolbar>
        <div className='appbar-left'>
          <img className='appbar-logo'
              alt='Logo czwartego weekendu z ginekologią'
              src={Logo} />
          <p className='appbar-name'>
            IV Weekend z ginekologią<br></br>
            Sekrety onkologii
          </p>
        </div>
        <div className='appbar-right'>
          <div className='appbar-right-top'>
            <p>TOP RIGHT (tutaj kiedyś coś będzie)</p>
          </div>
          <div className='appbar-right-left'>
            <NavigationTabs route={props.route} />
          </div>
        </div>        
      </EggToolbar>
    </AppBar>
  </>
}

export default NavigationBar
