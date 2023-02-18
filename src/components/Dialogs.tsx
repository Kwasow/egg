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

const transferDetails_pl = [
  ['Dane do przelewu:'],
  ['Adresat:', 'Warszawski Uniwersytet Medyczny'],
  ['Nr konta:', '70 1160 2202 0000 0003 3828 9663'],
  [
    'Tytuł przelewu:',
    '[Imię i Nazwisko], opłata konferencyjna, 4WG Sekrety Onkologii',
  ],
  ['Kwota:', '30zł'],
]
const transferDetails_en = [
  ['Transfer details:'],
  ['Recepient:', 'Warszawski Uniwersytet Medyczny'],
  ['Account number:', '70 1160 2202 0000 0003 3828 9663'],
  [
    'Transfer title:',
    '[Name and surname], opłata konferencyjna, 4WG Sekrety Onkologii',
  ],
  ['Value:', '30zł'],
]

export function RegistrationDialog(props: {
  open: boolean
  onClose: () => void
}) {
  const { open, onClose } = props
  const { t, i18n } = useTranslation()

  function openLink(link: string) {
    window.open(link)
  }

  function TransferDetails() {
    if (i18n.language === 'pl') {
      return (
        <>
          {transferDetails_pl.map((value, index) => {
            if (index === 0) {
              return <h3 key={index}>{value[0]}</h3>
            } else {
              return (
                <div key={index}>
                  <b>{value[0]}</b> {value[1]}
                </div>
              )
            }
          })}
        </>
      )
    } else {
      return (
        <>
          {transferDetails_en.map((value, index) => {
            if (index === 0) {
              return <h3 key={index}>{value[0]}</h3>
            } else {
              return (
                <div key={index}>
                  <b>{value[0]}</b> {value[1]}
                </div>
              )
            }
          })}
        </>
      )
    }
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
        <TransferDetails />
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
