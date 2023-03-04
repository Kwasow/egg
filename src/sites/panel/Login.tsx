import React from 'react'
import { Button, TextField } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { useAuthentication } from '../../utils/useAuthentication'

import './Login.css'

export default function LoginPage() {
  if (useAuthentication().token) {
    // TODO: Check if token valid

    return <Navigate replace to={'/admin'} />
  }

  // This is more efficient than using useState(), because it doesn't cause the
  // components to be redrawn
  let login = ''
  let password = ''

  function submit() {
    // Do something with login and password
    console.log(login)
    console.log(password)
  }

  return (
    <div className='login-wrapper'>
      <h1 className='title'>Logowanie do panelu administracyjnego</h1>
      <p className='subtitle'>Weekend z Ginekologią</p>

      <TextField
        label='Login'
        type={'text'}
        sx={{ marginBottom: '20px' }}
        onChange={(event) => (login = event.target.value)}
      />
      <TextField
        label='Hasło'
        type={'password'}
        sx={{ marginBottom: '20px' }}
        onChange={(event) => (password = event.target.value)}
      />
      <Button type='submit' onClick={submit}>
        Zaloguj
      </Button>
    </div>
  )
}
