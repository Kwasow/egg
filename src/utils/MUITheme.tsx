import { Button, ImageList, Tab, Tabs, Toolbar } from '@mui/material'
import { createTheme, styled } from '@mui/material/styles'

const colorPrimary = '#c53d63'
const colorSecondary = '#f50057'

export const eggTheme = createTheme({
  palette: {
    primary: {
      main: colorPrimary,
    },
    secondary: {
      main: colorSecondary,
    },
  },
})

export const navigationTabsTheme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
      disabled: '#ffffff',
    },
  },
})

export const EggToolbar = styled(Toolbar)(() => ({
  height: 100,
  display: 'flex',
  justifyContent: 'space-between'
}))

export const SpeakersTabs = styled(Tabs)(() => ({
  borderBottom: '2px solid #e8e8e8'
}))

export const SpeakersTab = styled(Tab)(() => ({
  '&.Mui-selected': {
    background: 'rgba(197, 61, 99, 0.15)'
  }
}))

export const PhotoGrid = styled(ImageList)(() => ({
  paddingLeft: '5%',
  paddingRight: '5%',
  overflow: 'hidden'
}))

export const AppBarActionButton = styled(Button)(() => ({
  '&:hover': {
    backgroundColor: 'white',
  },
  backgroundColor: 'white'
}))