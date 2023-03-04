import React, { useState } from 'react'
import { Button, Snackbar, TextField } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { useAuthentication } from '../../utils/useAuthentication'

import './Login.css'

type LoginResponse = {
  session_id: string
}

export default function LoginPage() {
  const authentication = useAuthentication()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  if (authentication.token) {
    return <Navigate replace to={'/admin'} />
  }

  // This is more efficient than using useState(), because it doesn't cause the
  // components to be redrawn
  let username = ''
  let password = ''

  async function submit() {
    setIsAuthenticating(true)

    await fetch('/php/login.php?username=' + username + '&password=' + password)
      .then((res) => res.json())
      .then((res: LoginResponse) => {
        if (res.session_id.length == 0) {
          setSnackbarOpen(true)
        } else {
          authentication.setToken(username, res.session_id)
          // TOOD: Navigate to /admin
        }
      })
      .catch((err) => {
        console.log(err)
        setSnackbarOpen(true)
      })

    setIsAuthenticating(false)
  }

  return (
    <div className='login-wrapper'>
      <h1 className='title'>Logowanie do panelu administracyjnego</h1>
      <p className='subtitle'>Weekend z Ginekologią</p>

      <TextField
        label='Login'
        type={'text'}
        sx={{ marginBottom: '20px' }}
        onChange={(event) => (username = event.target.value)}
        disabled={isAuthenticating}
      />
      <TextField
        label='Hasło'
        type={'password'}
        sx={{ marginBottom: '20px' }}
        onChange={(event) => (password = event.target.value)}
        disabled={isAuthenticating}
      />
      <Button type='submit' onClick={submit} disabled={isAuthenticating}>
        Zaloguj
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message='Logowanie nie powiodło się'
      />
    </div>
  )
}
