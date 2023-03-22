import React, { useRef, useState } from 'react'
import { Snackbar, TextField } from '@mui/material'
import { Navigate } from 'react-router-dom'
import {
  LoginButton,
  OnLogin,
  useAuthentication,
} from '../../utils/useAuthentication'

import './Login.css'

export default function LoginPage() {
  const authentication = useAuthentication()
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  if (authentication.tokenDetails) {
    return <Navigate replace to={'/admin'} />
  }

  // This is more efficient than using useState(), because it doesn't cause the
  // components to be redrawn
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = useRef<OnLogin>({
    before: () => {
      setIsAuthenticating(true)
    },
    onError: () => {
      setIsAuthenticating(false)
      setSnackbarOpen(true)
    },
  })

  return (
    <div className='login-wrapper'>
      <h1 className='title'>Logowanie do panelu administracyjnego</h1>
      <p className='subtitle'>Weekend z Ginekologią</p>

      <TextField
        label='Login'
        type={'text'}
        sx={{ marginBottom: '20px' }}
        onChange={(event) => setUsername(event.target.value)}
        disabled={isAuthenticating}
      />
      <TextField
        label='Hasło'
        type={'password'}
        sx={{ marginBottom: '20px' }}
        onChange={(event) => setPassword(event.target.value)}
        disabled={isAuthenticating}
      />
      <LoginButton
        username={username}
        password={password}
        onLogin={onLogin.current}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message='Logowanie nie powiodło się'
      />
    </div>
  )
}
