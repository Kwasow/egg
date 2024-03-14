import React, { useEffect, useState } from 'react'
import {
  LoginProtected,
  useAuthentication
} from '../../../utils/useAuthentication'
import {
  Button,
  Select,
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

  return (
    <>
      <div>
        <h1>Dodaj mówcę</h1>
        <form
          action={phpPrefix + 'speakers/add.php'}
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
            label='Imię i nazwisko'
            name='name'
            required
          />

          <TextField
            variant='outlined'
            label='Podtytuł'
            name='description'
            required
          />

          <TextField
            variant='outlined'
            label='Pozycja'
            name='position'
            type='number'
            required
          />

          <Select
            variant='outlined'
            label='Zasób'
            name='picture'
            required
          >
            {resources.map((resource) => (
              <option
                key={resource.id}
                value={resource.id}>
                ({resource.id}) {resource.name}
              </option>
            ))}
          </Select>

          <input
            type='hidden'
            name='token'
            value={authentication.tokenDetails?.token}
          />

          <Button type='submit'>Dodaj</Button>
        </form>
      </div>
    </>
  )
}
