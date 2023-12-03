import React from 'react'
import { Button, TextField } from '@mui/material'
import { useAppDispatch } from '../../../utils/redux/hooks'
import { useNavigate } from 'react-router-dom'
import { setRoute } from '../../../components/navigation/redux/slice'
import { LoginProtected } from '../../../utils/useAuthentication'

export default function ResourceEditor() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <LoginProtected className='main-wrapper'>
      <Button
        variant='contained'
        onClick={() => {
          navigate('/admin')
          dispatch(setRoute('/admin'))
        }}
      >
        Panel główny
      </Button>

      <AddResource />
      <h1>Edytuj zasoby</h1>
    </LoginProtected>
  )
}

function AddResource() {
  return (
    <div>
      <h1>Dodaj zasób</h1>
      <form
        action='https://webhook.site/32a503e0-0bce-45d8-a146-8611f0b7fc71'
        method='POST'
        encType='multipart/form-data'
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '30%',
        }}
      >
        <TextField
          variant='outlined'
          label='Nazwa wewnętrzna'
          name='name'
          required
        />

        <label>Wybierz plik</label>
        <input type='file' name='file' required />

        <Button type='submit'>Prześlij</Button>
      </form>
    </div>
  )
}
