import React, { ReactNode, useState } from 'react'
import { Button, Snackbar } from '@mui/material'
import {
  LoginProtected,
  LogoutButton,
  useAuthentication,
} from '../../utils/useAuthentication'

import './AdminHome.css'

export default function AdminHome() {
  const authentication = useAuthentication()
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  return (
    <LoginProtected className='main-wrapper'>
      <div className='top-line'>
        <h1 className='header-style'>
          Witaj, {authentication.tokenDetails?.username}!
        </h1>
        <LogoutButton onError={() => setSnackbarOpen(true)} />
      </div>

      <SettingsList>
        <SettingsItem name='Aktualności' active={false} />
        <SettingsItem name='Strona główna' active={false} />
        <SettingsItem name='Eksperci' active={false} />
        <SettingsItem name='Mówcy' active={false} />
        <SettingsItem name='Sponsorzy' active={false} />
        <SettingsItem name='Program' active={false} />
      </SettingsList>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message='Wylogowanie nie powiodło się'
      />
    </LoginProtected>
  )
}

function SettingsList(props: { children: Iterable<ReactNode> | ReactNode }) {
  return <table>${props.children}</table>
}

function SettingsItem(props: { name: string; active: boolean }) {
  return (
    <tr>
      <td>
        <p>${props.name}</p>
      </td>
      <td>
        <Button variant='contained' disabled={!props.active}>
          Edytuj
        </Button>
      </td>
    </tr>
  )
}
