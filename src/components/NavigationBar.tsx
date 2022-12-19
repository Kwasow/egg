import React from 'react'
import { AppBar, Box, Tabs, Tab } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import { EggToolbar, navigationTabsTheme } from '../utils/MUITheme'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'
import './NavigationBar.css'

const siteList = ['/home', '/program', '/speakers', '/photos']

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

  if (value == '/') {
    setValue('/home')
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate(siteList[newValue])
    setValue(siteList[newValue])
  }

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <ThemeProvider theme={navigationTabsTheme}>
          <Tabs value={checkRoute(value)} onChange={handleChange} >
            <Tab label={props.t('navbar.HomePage')}
              {...a11yProps(0)} />
            <Tab label={props.t('navbar.Program')}
              {...a11yProps(1)} />
            <Tab label={props.t('navbar.SpeakersAndOrganisers')}
              {...a11yProps(2)} />
            <Tab label={props.t('navbar.Photos')}
              {...a11yProps(4)} />
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
  const imageUrl = process.env.PUBLIC_URL + '/static/images/'

  return <>
    <AppBar position='fixed'>
      <EggToolbar>
        <div className='appbar-left'>
          <img className='appbar-logo'
            alt={t('navbar.LogoAlt') || ''}
            src={imageUrl + 'logo.png'} />
          <p className='appbar-name'>
            {t('navbar.Title.Line1')}<br></br>
            {t('navbar.Title.Line2')}
          </p>
        </div>
        <div className='appbar-right'>
          <div className='appbar-right-top'>
            <a
              href='https://www.facebook.com/'
              target='_blank'
              rel='noreferrer'>
              <img
                className='appbar-right-top-svg'
                src={imageUrl + 'facebook.svg'} />
            </a>
            <a
              href='https://www.instagram.com'
              target='_blank'
              rel='noreferrer'>
              <img
                className='appbar-right-top-svg'
                src={imageUrl + 'instagram.svg'} />
            </a>
            {i18n.language == 'pl'
              ? <a onClick={() => i18n.changeLanguage('en')}>
                <img
                  className='appbar-right-top-icon'
                  src={imageUrl + 'english.png'}/>
              </a>
              : <a onClick={() => i18n.changeLanguage('pl')}>
                <img
                  className='appbar-right-top-icon'
                  src={imageUrl + 'polish.png'}/>
              </a>
            }
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
