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
import {
  competitionRegistrationLink,
  conferenceRegistrationLink,
  decideLanguage,
  News,
  newsPrefix,
} from './Shared'

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

export function NewsDialog(props: { news: News | null; onClose: () => void }) {
  const { news, onClose } = props
  const { i18n, t } = useTranslation()

  return (
    <Dialog onClose={onClose} open={news !== null}>
      <DialogContent>
        <img src={newsPrefix + news?.image} className='dialog-news-image' />
        <p className='dialog-news-title'>
          {decideLanguage(i18n.language, news?.title_pl, news?.title_en)}
        </p>
        <p className='dialog-news-content'>
          {decideLanguage(i18n.language, news?.text_pl, news?.text_en)}
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('dialog.Close')}</Button>
      </DialogActions>
    </Dialog>
  )
}
