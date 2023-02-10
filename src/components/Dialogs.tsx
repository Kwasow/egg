import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

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
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <p>{t('registrationDialog.RegistrationConference')}</p>
        <Button
          variant='contained'
          sx={{ alignSelf: 'center' }}
          onClick={() => openLink(conferenceRegistrationLink)}
        >
          {t('navbar.Register')}
        </Button>
        <p>{t('registrationDialog.RegistrationCompetition')}</p>
        <Button
          variant='contained'
          sx={{ alignSelf: 'center' }}
          onClick={() => openLink(competitionRegistrationLink)}
        >
          {t('navbar.Register')}
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>OK</Button>
      </DialogActions>
    </Dialog>
  )
}
