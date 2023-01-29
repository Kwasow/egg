import React, { ReactElement } from 'react'
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
  Home as HomeIcon,
  ListAlt as ListAltIcon,
  Person as PersonIcon,
  Camera as CameraIcon
} from '@mui/icons-material'
import { NavigationBarSize } from './NavigationBar'
import { useTranslation } from 'react-i18next'

type MenuItem = {
  translationString: string,
  link: string[],
  icon: ReactElement
}

const menuItems: MenuItem[] = [
  {
    translationString: 'navbar.HomePage',
    link: ['/home', '/'],
    icon: <HomeIcon />
  },
  {
    translationString: 'navbar.Program',
    link: ['/program'],
    icon: <ListAltIcon />
  },
  {
    translationString: 'navbar.SpeakersAndOrganisers',
    link: ['/speakers'],
    icon: <PersonIcon />
  },
  {
    translationString: 'navbar.Photos',
    link: ['/photos'],
    icon: <CameraIcon />
  },
]

export function EggDrawer(props: {
  drawerOpen: boolean,
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>,
  size: NavigationBarSize
}) {
  const navigate = useNavigate()
  const {drawerOpen, setDrawerOpen} = props
  const {t} = useTranslation()

  return <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
    <List>
      {menuItems.map((value, key) => {
        return <ListItemButton key={key} onClick={() => {
          navigate(value.link[0])
          setDrawerOpen(false)
        }}>
          <ListItemIcon>
            {value.icon}
          </ListItemIcon>
          <ListItemText>
            {t(value.translationString)}
          </ListItemText>
        </ListItemButton>
      })}
    </List>
  </Drawer>
}