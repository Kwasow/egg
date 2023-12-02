import { Button } from '@mui/material'
import React from 'react'
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
      <h1>Dodaj zasób</h1>
      <h1>Edytuj zasoby</h1>
    </LoginProtected>
  )
}
