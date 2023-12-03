import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useAppDispatch } from '../../../utils/redux/hooks'
import { useNavigate } from 'react-router-dom'
import { setRoute } from '../../../components/navigation/redux/slice'
import {
  LoginProtected,
  useAuthentication,
} from '../../../utils/useAuthentication'
import { phpPrefix } from '../../../components/Shared'

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
      <EditResources />
    </LoginProtected>
  )
}

function AddResource() {
  const authentication = useAuthentication()

  return (
    <div>
      <h1>Dodaj zasób</h1>
      <form
        action={phpPrefix + '/addResource.php'}
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

        <input
          type='hidden'
          name='token'
          value={authentication.tokenDetails?.token}
        />

        <Button type='submit'>Prześlij</Button>
      </form>
    </div>
  )
}

interface Resource {
  id: number
  name: string
  originalFileName: string
  path: string
}

function EditResources() {
  const [resources, setResources] = useState(Array<Resource>())
  const authentication = useAuthentication()

  useEffect(() => {
    const headers = new Headers()
    headers.append('EggAuth', authentication.tokenDetails?.token || '')

    fetch(phpPrefix + '/getResources.php', {
      headers: headers,
    })
      .then((res) => res.json())
      .then((res) => setResources(res))
      .catch(/* TODO */)
  }, [])

  return (
    <>
      <h1>Edytuj zasoby</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nazwa</th>
            <th>Nazwa pliku</th>
            <th>Otwórz</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((value, index) => {
            return (
              <tr key={index}>
                <td>{value.id}</td>
                <td>{value.name}</td>
                <td>{value.originalFileName}</td>
                <td>todo</td>
                <td>todo</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
