import React from 'react'
import { LoginProtected } from '../../../utils/useAuthentication'
import { Box, Button, TextField } from '@mui/material'
import { useAppDispatch } from '../../../utils/redux/hooks'
import { useNavigate } from 'react-router-dom'
import { setRoute } from '../../../components/navigation/redux/slice'

export default function SpeakersEditor() {
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

      <AddSpeakerView />
      <h1>Edytuj kolejność</h1>
    </LoginProtected>
  )
}

function AddSpeakerView() {
  return (
    <>
      <h1>Dodaj mówcę</h1>
      <Box component='form'>
        <TextField
          id='speaker-name'
          label='Imię i nazwisko'
          variant='outlined'
        />
        <TextField id='speaker-subtitle' label='Podtytuł' variant='outlined' />
      </Box>
    </>
  )
}
