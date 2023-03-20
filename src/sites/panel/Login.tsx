import React, { useState } from 'react'
import { Button, Snackbar, TextField } from '@mui/material'
import { Navigate, useNavigate } from 'react-router-dom'
import { LoginResponse, useAuthentication } from '../../utils/useAuthentication'
import { Buffer } from 'buffer'

import './Login.css'

type LoginPostBody = {
  username: string
  password: string
}

export default function LoginPage() {
  const authentication = useAuthentication()
  const navigate = useNavigate()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  if (authentication.tokenDetails) {
    return <Navigate replace to={'/admin'} />
  }

  // This is more efficient than using useState(), because it doesn't cause the
  // components to be redrawn
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function submit() {
    setIsAuthenticating(true)

    const body: LoginPostBody = {
      username: Buffer.from(username).toString(),
      password: Buffer.from(password).toString(),
    }

    await fetch('/php/login.php', {
      method: 'POST',
      body: JSON.stringify(body),
      cache: 'no-store',
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Server responded: ' + res.status)
        }
      })
      .then((res: LoginResponse) => {
        if (res.session_id.length > 0) {
          authentication.setToken(username, res.session_id)
          navigate('/admin')
        }
      })
      .catch((err) => console.error(err))

    // Login failed if we reached this point
    setIsAuthenticating(false)
    setSnackbarOpen(true)
  }

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
