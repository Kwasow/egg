import React, { ReactNode, useState } from 'react'
import { Button, Snackbar } from '@mui/material'
import {
  LoginProtected,
  LogoutButton,
  useAuthentication,
} from '../../utils/useAuthentication'

import './AdminHome.css'
import { useAppDispatch } from '../../utils/redux/hooks'
import { setRoute } from '../../components/navigation/redux/slice'
import { useNavigate } from 'react-router'

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
        <SettingsItem name='Aktualności' route='' />
        <SettingsItem name='Strona główna' route='' />
        <SettingsItem name='Eksperci' route='' />
        <SettingsItem name='Mówcy' route='speakers' />
        <SettingsItem name='Sponsorzy' route='' />
        <SettingsItem name='Program' route='' />
        <SettingsItem name='Zasoby' route='resources' />
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
  return <table>{props.children}</table>
}

function SettingsItem(props: { name: string; route: string }) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const fullRoute = '/admin/' + props.route

  return (
    <tr>
      <td>
        <p>{props.name}</p>
      </td>
      <td>
        <Button
          variant='contained'
          disabled={props.route.length == 0}
          onClick={() => {
            navigate(fullRoute)
            dispatch(setRoute(fullRoute))
          }}
        >
          Edytuj
        </Button>
      </td>
    </tr>
  )
}
