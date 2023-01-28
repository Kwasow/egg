import React, { useEffect, useState } from 'react'
import {
  AppBar,
  Box,
  Tabs,
  Tab,
  Drawer,
  ListItem,
  List,
  ListItemText,
  IconButton,
  ListItemIcon
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
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  ListAlt as ListAltIcon,
  Person as PersonIcon,
  Camera as CameraIcon
} from '@mui/icons-material'
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

enum ScreenSize {SMALL, MEDIUM, BIG}

function NavigationBar(props: {
  route: string
}) {
  const {t, i18n} = useTranslation()
  const imageUrl = process.env.PUBLIC_URL + '/static/images/'
  const navigate = useNavigate()

  function updateScreenSize() {
    if (window.innerWidth > 1250) {
      setScreenSize(ScreenSize.BIG)
    } else {
      setScreenSize(ScreenSize.MEDIUM)
    }
  }
  const [screenSize, setScreenSize] = useState(ScreenSize.BIG)
  window.addEventListener('resize', updateScreenSize)
  useEffect(updateScreenSize, [])

  const [drawerOpen, setDrawerOpen] = useState(false)

  return <>
    <AppBar position='fixed'>
      <EggToolbar>
        <div className='appbar'>
          <div className='appbar-left' onClick={() => navigate('/')}>
            <Drawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}>
              <List>
                <ListItem onClick={() => setDrawerOpen(false)}>
                  <ListItemIcon><HomeIcon /></ListItemIcon>
                  <ListItemText>
                    {t('navbar.HomePage')}
                  </ListItemText>
                </ListItem>
                <ListItem onClick={() => setDrawerOpen(false)}>
                  <ListItemIcon><ListAltIcon /></ListItemIcon>
                  <ListItemText>
                    {t('navbar.Program')}
                  </ListItemText>
                </ListItem>
                <ListItem onClick={() => setDrawerOpen(false)}>
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText>
                    {t('navbar.SpeakersAndOrganisers')}
                  </ListItemText>
                </ListItem>
                <ListItem onClick={() => setDrawerOpen(false)}>
                  <ListItemIcon><CameraIcon /></ListItemIcon>
                  <ListItemText>
                    {t('navbar.Photos')}
                  </ListItemText>
                </ListItem>
              </List>
            </Drawer>
            <IconButton
              aria-label="Menu"
              color='inherit'
              onClick={() => setDrawerOpen(true)}
              style={{
                visibility:
                  screenSize === ScreenSize.BIG ? 'collapse' : 'visible'
              }}>
              <MenuIcon />
            </IconButton>
            <div className='appbar-navigate-home-container'>
              <img className='appbar-logo'
                alt={t('navbar.LogoAlt') || ''}
                src={imageUrl + 'logo.png'} />
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
            visibility: screenSize === ScreenSize.BIG ? 'visible' : 'collapse'
          }}>
            <NavigationTabs route={props.route} t={t}/>
          </div>

          <div className='appbar-right'>
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
            <AppBarActionButton 
              onClick={() => window.open('https://google.com')}>
              {t('navbar.Register')}
            </AppBarActionButton>
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
        </div>     
      </EggToolbar>
    </AppBar>
  </>
}

export default NavigationBar
