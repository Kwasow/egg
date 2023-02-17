import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import './Dialogs.css'

const conferenceRegistrationLink = 'https://forms.gle/wTtXxs4Y5smXFzrs5'
const competitionRegistrationLink = 'https://forms.gle/fuuxtqesUna84M2r7'

export function RegisterNotAvailableDialog(props: {
  open: boolean
  onClose: () => void
}) {
  const { open, onClose } = props
  const { t } = useTranslation()

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{t('registrationDialog.NotYet.Title')}</DialogTitle>
      <DialogContent>
        <p>{t('registrationDialog.NotYet.Text')}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>OK</Button>
      </DialogActions>
    </Dialog>
  )
}

export function RegistrationDialog(props: {
  open: boolean
  onClose: () => void
}) {
  const { open, onClose } = props
  const { t } = useTranslation()

  function openLink(link: string) {
    window.open(link)
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{t('registrationDialog.Registration')}</DialogTitle>
      <DialogContent>
        <table>
          <tr>
            <td className='cell-bold'>{t('registrationDialog.Mandatory')}</td>
            <td>{t('registrationDialog.RegistrationConference')}</td>
            <td>
              <Button
                variant='contained'
                onClick={() => openLink(conferenceRegistrationLink)}
              >
                {t('navbar.Register')}
              </Button>
            </td>
          </tr>
          <tr>
            <td className='cell-bold'>{t('registrationDialog.Optional')}</td>
            <td>{t('registrationDialog.RegistrationCompetition')}</td>
            <td>
              <Button
                variant='contained'
                onClick={() => openLink(competitionRegistrationLink)}
              >
                {t('navbar.Register')}
              </Button>
            </td>
          </tr>
        </table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>OK</Button>
      </DialogActions>
    </Dialog>
  )
}
