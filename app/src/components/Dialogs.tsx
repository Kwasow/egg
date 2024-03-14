import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import {
  competitionRegistrationLink,
  conferenceRegistrationLink,
  decideLanguage,
  News,
  newsPrefix,
} from './Shared'
import { LinkItUrl } from 'react-linkify-it'

import './Dialogs.css'

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

  // Leftover from 2023 edition
  // function TransferDetails() {
  //   if (i18n.language === 'pl') {
  //     return (
  //       <>
  //         {transferDetails_pl.map((value, index) => {
  //           if (index === 0) {
  //             return <h3 key={index}>{value[0]}</h3>
  //           } else {
  //             return (
  //               <div key={index}>
  //                 <b>{value[0]}</b> {value[1]}
  //               </div>
  //             )
  //           }
  //         })}
  //       </>
  //     )
  //   } else {
  //     return (
  //       <>
  //         {transferDetails_en.map((value, index) => {
  //           if (index === 0) {
  //             return <h3 key={index}>{value[0]}</h3>
  //           } else {
  //             return (
  //               <div key={index}>
  //                 <b>{value[0]}</b> {value[1]}
  //               </div>
  //             )
  //           }
  //         })}
  //       </>
  //     )
  //   }
  // }

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

export function NewsDialog(props: {
  news: News | null
  open: boolean
  onClose: () => void
}) {
  const { news, open, onClose } = props
  const { i18n, t } = useTranslation()

  function Paragraphs(props: { paragraphs: string[] }) {
    const { paragraphs } = props

    return (
      <>
        {paragraphs.map((value, index) => {
          return (
            <LinkItUrl className='default-link' key={index}>
              <p className='dialog-news-content'>{value}</p>
            </LinkItUrl>
          )
        })}
      </>
    )
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogContent>
        <img src={newsPrefix + news?.image} className='dialog-news-image' />
        <p className='dialog-news-title'>
          {decideLanguage(i18n.language, news?.title_pl, news?.title_en)}
        </p>
        {i18n.language === 'pl' ? (
          <Paragraphs paragraphs={news?.text_pl || []} />
        ) : (
          <Paragraphs paragraphs={news?.text_en || []} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('dialog.Close')}</Button>
      </DialogActions>
    </Dialog>
  )
}
