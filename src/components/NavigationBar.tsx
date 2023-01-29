import React, { useEffect, useState } from 'react'
import { AppBar, Box, Tabs, Tab, IconButton } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import {
  AppBarActionButton,
  EggToolbar,
  navigationTabsTheme
} from '../utils/MUITheme'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'
import { Menu as MenuIcon } from '@mui/icons-material'
import './NavigationBar.css'
import { FacebookIconLink, InstagramIconLink, imageUrl } from './Shared'
import { EggDrawer } from './Drawer'

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
    <Box sx={{ alignSelf: 'flex-end' }}>
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

function LanguageSwitcher(props: {
  style?: React.CSSProperties
}) {
  const {i18n} = useTranslation()

  return i18n.language == 'pl'
    ? <a onClick={() => i18n.changeLanguage('en')} {...props}>
      <img
        className='appbar-right-top-icon'
        src={imageUrl + 'english.png'}/>
    </a>
    : <a onClick={() => i18n.changeLanguage('pl')} {...props}>
      <img
        className='appbar-right-top-icon'
        src={imageUrl + 'polish.png'}/>
    </a>
}

export enum NavigationBarSize {XSMALL, SMALL, MEDIUM, BIG}

function isScreenXSmall(size: NavigationBarSize) {
  return size === NavigationBarSize.XSMALL
}

function isScreenSmall(size: NavigationBarSize) {
  return size === NavigationBarSize.SMALL
      || size === NavigationBarSize.XSMALL
}

function isScreenBig(size: NavigationBarSize) {
  return size === NavigationBarSize.BIG
}

function NavigationBar(props: {
  route: string
}) {
  const {route} = props

  const {t} = useTranslation()
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [screenSize, setScreenSize] = useState(NavigationBarSize.BIG)
  function updateScreenSize() {
    if (1250 < window.innerWidth) {
      setScreenSize(NavigationBarSize.BIG)
    } else if (720 < window.innerWidth) {
      setScreenSize(NavigationBarSize.MEDIUM)
    } else if (390 < window.innerWidth) {
      setScreenSize(NavigationBarSize.SMALL)
    } else {
      setScreenSize(NavigationBarSize.XSMALL)
    }
  }
  window.addEventListener('resize', updateScreenSize)
  useEffect(updateScreenSize, [])

  return <>
    <AppBar position='fixed'>
      <EggToolbar>
        <div className='appbar'>
          <div className='appbar-left'>
            <IconButton
              aria-label='Menu'
              color='inherit'
              onClick={() => {
                setDrawerOpen(true)
              }}
              style={{
                visibility: isScreenBig(screenSize) ? 'collapse' : 'visible'
              }}>
              <MenuIcon />
            </IconButton>
            <div
              className='appbar-navigate-home-container'
              onClick={() => navigate('/')}>
              <img className='appbar-logo'
                alt={t('navbar.LogoAlt') || ''}
                src={imageUrl + 'logo.png'}
                style={{
                  visibility:
                    isScreenXSmall(screenSize) ? 'collapse' : 'visible'
                }}/>
              <div className='appbar-name-container'>
                <p className='appbar-name'>
                  {t('navbar.Title.Line1')}
                </p>
                <p className='appbar-subname'>
                  {t('navbar.Title.Line2')}
                </p>
              </div>
            </div>
          </div>

          <div className='appbar-middle' style={{
            visibility: isScreenBig(screenSize) ? 'visible' : 'collapse'
          }}>
            <NavigationTabs route={route} t={t}/>
          </div>

          <div className='appbar-right' style={{
            visibility: isScreenSmall(screenSize) ? 'collapse' : 'visible'
          }}>
            <FacebookIconLink />
            <InstagramIconLink />
            <AppBarActionButton 
              onClick={() => window.open('https://google.com')}>
              {t('navbar.Register')}
            </AppBarActionButton>
            <LanguageSwitcher/>
          </div>
        </div>     
      </EggToolbar>
      <EggDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        size={screenSize}/>
    </AppBar>
  </>
}

export default NavigationBar
