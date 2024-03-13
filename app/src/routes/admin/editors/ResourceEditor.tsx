import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useAppDispatch } from '../../../utils/redux/hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { setRoute } from '../../../components/navigation/redux/slice'
import {
  LoginProtected,
  TokenControl,
  useAuthentication,
} from '../../../utils/useAuthentication'
import { phpPrefix, resourcesPrefix } from '../../../components/Shared'

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
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.has('add_success')) {
      if (searchParams.get('add_success') === 'true') {
        alert('Dodawanie zasobu udane')
      } else {
        alert('Dodawanie zasobu nie powiodło się')
      }
    }
  })

  return (
    <div>
      <h1>Dodaj zasób</h1>
      <form
        action={phpPrefix + 'resources/add.php'}
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

function deleteResource(id: number, authentication: TokenControl) {
  const headers = new Headers()
  headers.append('EggAuth', authentication.tokenDetails?.token || '')

  fetch(phpPrefix + 'resources/delete.php?id=' + id, {
    headers: headers,
  }).then((_) => window.location.reload())
}

function EditResources() {
  const [resources, setResources] = useState(Array<ResourceJSON>())
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
                <td>
                  <Button
                    onClick={() =>
                      window.open(resourcesPrefix + value.path, '_blank')
                    }
                  >
                    Pokaż
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => deleteResource(value.id, authentication)}
                  >
                    Usuń
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
