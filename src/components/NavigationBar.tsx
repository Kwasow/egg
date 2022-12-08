import React from 'react'
import { AppBar, Box, Tabs, Tab, Button } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import { EggToolbar, navigationTabsTheme } from '../utils/MUITheme'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'
import './NavigationBar.css'

const siteList = ['/home', '/program', '/speakers', '/sponsors', '/photos']

function a11yProps(index: number) {
  return {
    id: `navigation-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
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
  t: TFunction
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
            <Tab label={props.t('navbar.HomePage')} {...a11yProps(0)} />
            <Tab label={props.t('navbar.Program')} {...a11yProps(1)} />
            <Tab label={props.t('navbar.SpeakersAndOrganisers')} {...a11yProps(2)} />
            <Tab label={props.t('navbar.Sponsors')} {...a11yProps(3)} />
            <Tab label={props.t('navbar.Photos')} {...a11yProps(4)} />
          </Tabs>
        </ThemeProvider>
      </Box>
    </Box>
  )
}

function NavigationBar(props: {
  route: string
}) {
  const {t, i18n} = useTranslation()
  const logoAlt = t('navbar.LogoAlt')

  return <>
    <AppBar position='fixed'>
      <EggToolbar>
        <div className='appbar-left'>
          <img className='appbar-logo'
            alt={logoAlt}
            src={process.env.PUBLIC_URL + '/static/images/logo.png'} />
          <p className='appbar-name'>
            {t('navbar.Title.Line1')}<br></br>
            {t('navbar.Title.Line2')}
          </p>
        </div>
        <div className='appbar-right'>
          <div className='appbar-right-top'>
            <Button onClick={() => i18n.changeLanguage('en')} sx={{ color: 'blue' }}>EN</Button>
            <Button onClick={() => i18n.changeLanguage('pl')} sx={{ color: 'blue' }}>PL</Button>
          </div>
          <div className='appbar-right-left'>
            <NavigationTabs route={props.route} t={t}/>
          </div>
        </div>        
      </EggToolbar>
    </AppBar>
  </>
}

export default NavigationBar
