import { Button, Card, ImageList, Tab, Tabs, Toolbar } from '@mui/material'
import { createTheme, styled } from '@mui/material/styles'
import '../index.css'

const colorPrimary = '#ff246b'
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
  typography: {
    fontFamily: ['"Open Sans"'].join(','),
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
  typography: {
    fontFamily: ['"Open Sans"'].join(','),
  },
})

export const EggToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}))

export const SpeakersTabs = styled(Tabs)(() => ({
  borderBottom: '2px solid #e8e8e8',
}))

export const SpeakersTab = styled(Tab)(() => ({
  '&.Mui-selected': {
    background: '#ffe6ee',
  },
}))

export const PhotoGrid = styled(ImageList)(() => ({
  paddingLeft: '5%',
  paddingRight: '5%',
  overflow: 'hidden',
}))

export const AppBarActionButton = styled(Button)(() => ({
  '&:hover': {
    backgroundColor: 'white',
  },
  backgroundColor: 'white',
}))

export const NewsCard = styled(Card)(() => ({
  marginLeft: 20,
  marginRight: 20,
}))
