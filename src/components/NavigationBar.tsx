import React, { ReactElement, useEffect, useState } from 'react'
import {
  AppBar,
  Box,
  Tabs,
  Tab,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
} from '@mui/material'
import { ThemeProvider } from '@mui/system'
import {
  AppBarActionButton,
  EggToolbar,
  navigationTabsTheme,
} from '../utils/MUITheme'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'
import './NavigationBar.css'
import { FacebookIconLink, InstagramIconLink, imageUrl } from './Shared'
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  ListAlt as ListAltIcon,
  Person as PersonIcon,
  Camera as CameraIcon,
} from '@mui/icons-material'
import { RegistrationDialog } from './Dialogs'

type MenuItem = {
  translationString: string
  link: string[]
  icon: ReactElement
}

const menuItems: MenuItem[] = [
  {
    translationString: 'navbar.HomePage',
    link: ['/home', '/'],
    icon: <HomeIcon />,
  },
  {
    translationString: 'navbar.Program',
    link: ['/program'],
    icon: <ListAltIcon />,
  },
  {
    translationString: 'navbar.ExpertsAndSpeakers',
    link: ['/speakers'],
    icon: <PersonIcon />,
  },
  {
    translationString: 'navbar.Photos',
    link: ['/photos'],
    icon: <CameraIcon />,
  },
]

function LanguageSwitcher(props: { style?: React.CSSProperties }) {
  const { i18n } = useTranslation()

  return i18n.language == 'pl' ? (
    <a onClick={() => i18n.changeLanguage('en')} {...props}>
      <img className='appbar-right-top-icon' src={imageUrl + 'english.png'} />
    </a>
  ) : (
    <a onClick={() => i18n.changeLanguage('pl')} {...props}>
      <img className='appbar-right-top-icon' src={imageUrl + 'polish.png'} />
    </a>
  )
}

export function EggDrawer(props: {
  drawerOpen: boolean
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
  setDialogOpen: (state: boolean) => void
}) {
  const navigate = useNavigate()
  const { drawerOpen, setDrawerOpen, setDialogOpen } = props
  const { t } = useTranslation()

  return (
    <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <List>
        <div className='drawer-logo-container'>
          <img
            className='drawer-logo'
            src={imageUrl + 'logo.png'}
            alt={t('navbar.LogoAlt') || ''}
          />
        </div>
        <Divider />
        {menuItems.map((value, key) => {
          return (
            <ListItemButton
              key={key}
              onClick={() => {
                navigate(value.link[0])
                setDrawerOpen(false)
              }}
            >
              <ListItemIcon
                sx={{
                  color: '#c53d63',
                }}
              >
                {value.icon}
              </ListItemIcon>
              <ListItemText>
                {(t(value.translationString) || '').toUpperCase()}
              </ListItemText>
            </ListItemButton>
          )
        })}
        <Divider />
        <div className='drawer-bottom'>
          <Button
            sx={{
              paddingTop: '15px',
              paddingBottom: '15px',
            }}
            onClick={() => setDialogOpen(true)}
          >
            {t('navbar.Register')}
          </Button>
          <div className='drawer-bottom-icons'>
            <FacebookIconLink />
            <InstagramIconLink />
            <LanguageSwitcher />
          </div>
        </div>
      </List>
    </Drawer>
  )
}

function a11yProps(index: number) {
  return {
    id: `navigation-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function checkRoute(route: string) {
  const index = menuItems.findIndex((value: MenuItem) => {
    return route === value.link[0]
  })

  if (index !== -1) {
    return index
  }

  return false
}

function NavigationTabs(props: { route: string; t: TFunction }) {
  const [value, setValue] = useState(props.route)
  const navigate = useNavigate()

  if (value == '/') {
    setValue('/home')
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate(menuItems[newValue].link[0])
    setValue(menuItems[newValue].link[0])
  }

  return (
    <Box sx={{ alignSelf: 'flex-end' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <ThemeProvider theme={navigationTabsTheme}>
          <Tabs value={checkRoute(value)} onChange={handleChange}>
            <Tab label={props.t('navbar.HomePage')} {...a11yProps(0)} />
            <Tab label={props.t('navbar.Program')} {...a11yProps(1)} />
            <Tab
              label={props.t('navbar.ExpertsAndSpeakers')}
              {...a11yProps(2)}
            />
            <Tab label={props.t('navbar.Photos')} {...a11yProps(4)} />
          </Tabs>
        </ThemeProvider>
      </Box>
    </Box>
  )
}

function NavigationBar(props: { route: string }) {
  const { route } = props

  const { t } = useTranslation()
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [bigScreen, setBigScreen] = useState(true)
  function updateScreenSize() {
    if (1250 < window.innerWidth) {
      setBigScreen(true)
    } else {
      setBigScreen(false)
    }
  }
  window.addEventListener('resize', updateScreenSize)
  useEffect(updateScreenSize, [])

  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <AppBar position='fixed'>
        <EggToolbar>
          <div className='appbar'>
            <div className='appbar-left'>
              <IconButton
                aria-label='Menu'
                color='inherit'
                onClick={() => setDrawerOpen(true)}
                style={{ display: bigScreen ? 'none' : 'inherit' }}
              >
                <MenuIcon />
              </IconButton>
              <div
                className='appbar-navigate-home-container'
                onClick={() => navigate('/')}
              >
                <img
                  className='appbar-logo'
                  alt={t('navbar.LogoAlt') || ''}
                  src={imageUrl + 'logo.png'}
                />
                <div className='appbar-name-container'>
                  <p className='appbar-name'>{t('navbar.Title.Line1')}</p>
                  <p className='appbar-subname'>{t('navbar.Title.Line2')}</p>
                </div>
              </div>
            </div>

            <div className='appbar-middle'>
              <NavigationTabs route={route} t={t} />
            </div>

            <div className='appbar-right'>
              <FacebookIconLink white={true} />
              <InstagramIconLink white={true} />
              <AppBarActionButton onClick={() => setDialogOpen(true)}>
                {t('navbar.Register')}
              </AppBarActionButton>
              <LanguageSwitcher />
            </div>
          </div>
        </EggToolbar>
        <EggDrawer
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          setDialogOpen={setDialogOpen}
        />
      </AppBar>
      <RegistrationDialog
        onClose={() => setDialogOpen(false)}
        open={dialogOpen}
      />
    </>
  )
}

export default NavigationBar
