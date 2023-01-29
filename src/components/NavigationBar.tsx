import React, { useEffect, useState } from 'react'
import {
  AppBar,
  Box,
  Tabs,
  Tab,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material'
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
import {
  Home as HomeIcon,
  ListAlt as ListAltIcon,
  Person as PersonIcon,
  Camera as CameraIcon
} from '@mui/icons-material'

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

enum ScreenSize {XSMALL, SMALL, MEDIUM, BIG}

function isScreenXSmall(size: ScreenSize) {
  return size === ScreenSize.XSMALL
}

function isScreenSmall(size: ScreenSize) {
  return size === ScreenSize.SMALL
      || size === ScreenSize.XSMALL
}

function isScreenBig(size: ScreenSize) {
  return size === ScreenSize.BIG
}

function NavigationBar(props: {
  route: string
}) {
  const {route} = props

  const {t} = useTranslation()
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [screenSize, setScreenSize] = useState(ScreenSize.BIG)
  function updateScreenSize() {
    if (1250 < window.innerWidth) {
      setScreenSize(ScreenSize.BIG)
    } else if (720 < window.innerWidth) {
      setScreenSize(ScreenSize.MEDIUM)
    } else if (390 < window.innerWidth) {
      setScreenSize(ScreenSize.SMALL)
    } else {
      setScreenSize(ScreenSize.XSMALL)
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
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
          <ListItemButton onClick={() => {
            setDrawerOpen(false)
            navigate('/home')
          }}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>
              {t('navbar.HomePage')}
            </ListItemText>
          </ListItemButton>
          <ListItemButton onClick={() => {
            setDrawerOpen(false)
            navigate('/program')
          }}>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText>
              {t('navbar.Program')}
            </ListItemText>
          </ListItemButton>
          <ListItemButton onClick={() => {
            setDrawerOpen(false)
            navigate('/speakers')
          }}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText>
              {t('navbar.SpeakersAndOrganisers')}
            </ListItemText>
          </ListItemButton>
          <ListItemButton onClick={() => {
            setDrawerOpen(false)
            navigate('/photos')
          }}>
            <ListItemIcon>
              <CameraIcon />
            </ListItemIcon>
            <ListItemText>
              {t('navbar.Photos')}
            </ListItemText>
          </ListItemButton>
        </List>
      </Drawer>
    </AppBar>
  </>
}

export default NavigationBar
