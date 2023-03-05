import React, { useState } from 'react'
import { Button, Snackbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
  LoginProtected,
  useAuthentication,
} from '../../utils/useAuthentication'

import './AdminHome.css'

export default function AdminHome() {
  const authentication = useAuthentication()
  const navigate = useNavigate()
  const [logoutInProgress, setLogoutInProgress] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  async function signOut() {
    setLogoutInProgress(true)

    await fetch('/php/logout.php?token=' + authentication.tokenDetails?.token)
      .then((res) => {
        if (res.ok) {
          authentication.clearToken()
          console.log('here')
          navigate('/login')
        } else {
          throw new Error('Server responded: ' + res.status)
        }
      })
      .catch((err) => console.error(err))

    // Logout failed if we reached this point
    setLogoutInProgress(false)
    setSnackbarOpen(true)
  }

  return (
    <LoginProtected className='main-wrapper'>
      <div className='top-line'>
        <h1 className='header-style'>
          Witaj, {authentication.tokenDetails?.username}!
        </h1>
        <Button
          onClick={signOut}
          disabled={logoutInProgress}
          variant='outlined'
        >
          Wyloguj
        </Button>
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
            <p>Eksperci i mówcy</p>
          </td>
          <td>
            <Button variant='contained' disabled={true}>
              Edytuj
            </Button>
          </td>
        </tr>
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
