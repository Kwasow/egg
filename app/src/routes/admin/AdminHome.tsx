import React, { useState } from 'react'
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

      <table>
        <tr>
          <td>
            <p>Aktualności</p>
          </td>
          <td>
            <Button variant='contained' disabled={true}>
              Edytuj
            </Button>
          </td>
        </tr>
        <tr>
          <td>
            <p>Eksperci</p>
          </td>
          <td>
            <Button variant='contained' disabled={true}>
              Edytuj
            </Button>
          </td>
        </tr>
        <tr>
          <td>
            <p>Mówcy</p>
          </td>
          <td>
            <Button variant='contained' disabled={true}>
              Edytuj
            </Button>
          </td>
        </tr>
      </table>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message='Wylogowanie nie powiodło się'
      />
    </LoginProtected>
  )
}
