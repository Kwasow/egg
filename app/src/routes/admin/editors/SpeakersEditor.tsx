import React, { useEffect, useState } from 'react'
import {
  LoginProtected,
  useAuthentication
} from '../../../utils/useAuthentication'
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material'
import { useAppDispatch } from '../../../utils/redux/hooks'
import { useNavigate } from 'react-router-dom'
import { setRoute } from '../../../components/navigation/redux/slice'
import { phpPrefix } from '../../../components/Shared'
import { Resource } from './ResourceEditor'

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [resources, setResources] = useState(Array<Resource>())
  const authentication = useAuthentication()

  useEffect(() => {
    const headers = new Headers()
    headers.append('EggAuth', authentication.tokenDetails?.token || '')

    fetch(phpPrefix + 'resources/get.php', {
      headers: headers,
    })
      .then((res) => res.json())
      .then((res) => setResources(res))
      .catch(/* TODO */)
  }, [])

  function handleChange(event: SelectChangeEvent) {
    console.log(event.target)
  }

  return (
    <>
      <h1>Dodaj mówcę</h1>
      <FormControl>
        <TextField
          id='speaker-name'
          label='Imię i nazwisko'
          variant='outlined'
        />
        <TextField id='speaker-subtitle' label='Podtytuł' variant='outlined' />

        <Select
          label="Zdjęcie"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}
