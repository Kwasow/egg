import { Button, TextField } from '@mui/material'
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthentication } from '../../utils/useAuthentication'

import './Login.css'

export default function LoginPage() {
  if (useAuthentication().token) {
    return <Navigate replace to={'/admin'} />
  }

  return (
    <div className='login-wrapper'>
      <h1 className='title'>Logowanie do panelu administracyjnego</h1>
      <p className='subtitle'>Weekend z Ginekologią</p>

      <TextField className='input-field' label='Login' type={'text'} />
      <TextField className='input-field' label='Hasło' type={'password'} />
      <Button>Zaloguj</Button>
    </div>
  )
}
