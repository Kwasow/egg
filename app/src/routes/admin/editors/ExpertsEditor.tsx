import React, { useEffect, useState } from 'react'
import {
  LoginProtected,
  useAuthentication,
} from '../../../utils/useAuthentication'
import { Button, Select, TextField } from '@mui/material'
import { useAppDispatch } from '../../../utils/redux/hooks'
import { useNavigate } from 'react-router-dom'
import { setRoute } from '../../../components/navigation/redux/slice'
import { phpPrefix, resourcesPrefix } from '../../../components/Shared'
import { Resource } from './ResourceEditor'
import { PersonJSON } from '../../experts/ExpertsAndSpeakers'
import tinymce from 'tinymce/tinymce'

function addslashes(str: string): string {
  return str
    .replaceAll('\\', '\\\\')
    .replaceAll('"', '\\"')
    .replaceAll('\n', '')
}

export default function ExpertsEditor() {
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

      <AddExpertView />
      <EditExpertsView />
    </LoginProtected>
  )
}

function AddExpertView() {
  const [resources, setResources] = useState(Array<Resource>())
  const [description, setDescription] = useState('')
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
    
    tinymce.init({
      selector: 'textarea#tinymce_description',
      plugins: 'lists',
      toolbar: 'undo redo | bold italic underline strikethrough | \
        numlist bullist indent outdent | removeformat',
      promotion: false,
      menubar: false,
      setup: (editor) => {
        editor.on(
          'KeyDown KeyUp Paste Cut Undo Redo SetContent Remove Redo NodeChange',
          () => setDescription(addslashes(editor.getContent()))
        )
      }
    })
  }, [])

  return (
    <>
      <div>
        <h1>Dodaj eksperta</h1>
        <form
          action={phpPrefix + 'experts/add.php'}
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
            label='Pozycja'
            name='position'
            type='number'
            required
          />

          <Select variant='outlined' label='Zasób' name='picture' required>
            {resources.map((resource) => (
              <option key={resource.id} value={resource.id}>
                ({resource.id}) {resource.name}
              </option>
            ))}
          </Select>

          <textarea id='tinymce_description' placeholder='Opis'/>

          <input
            type='hidden'
            name='description'
            value={description}/>

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

function EditExpertsView() {
  const [speakers, setSpeakers] = useState<PersonJSON[]>([])
  const authentication = useAuthentication()

  useEffect(() => {
    const headers = new Headers()
    headers.append('EggAuth', authentication.tokenDetails?.token || '')

    fetch(phpPrefix + 'experts/get.php', {
      headers: headers,
    })
      .then((res) => res.json())
      .then((res) => setSpeakers(res.list))
      .catch(/* TODO */)
  }, [])

  function deleteSpeaker(id: number) {
    const headers = new Headers()
    headers.append('EggAuth', authentication.tokenDetails?.token || '')

    fetch(phpPrefix + 'experts/delete.php?id=' + id, {
      headers: headers,
    }).then((_) => window.location.reload())
  }

  function showPicture(picture: string) {
    window.open(resourcesPrefix + picture, '_blank')
  }

  return (
    <div>
      <h1>Eksperci</h1>
      {speakers.length === 0 ? (
        <p>Lista ekspertów jest pusta</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Pozycja</th>
              <th>Imię i naziwsko</th>
              <th>Opis</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {speakers.map((value) => {
              return (
                <tr key={value.id}>
                  <td>{value.position}</td>
                  <td>{value.name}</td>
                  <td dangerouslySetInnerHTML={{__html: value.description}}/>
                  <td>
                    <Button onClick={() => deleteSpeaker(value.id)}>
                      Usuń
                    </Button>

                    <Button onClick={() => showPicture(value.picture)}>
                      Zdjęcie
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
