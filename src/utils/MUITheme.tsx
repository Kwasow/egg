import { Toolbar } from "@mui/material"
import { createTheme, styled } from "@mui/material/styles"

export const eggTheme = createTheme({
  palette: {
    primary: {
      main: '#c53d63',
    },
    secondary: {
      main: '#f50057',
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