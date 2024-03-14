import React, { useEffect, useState } from 'react'
import {
  CircularProgress,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  // TableHead,
  TableRow,
  useTheme,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useTranslation } from 'react-i18next'
import './Program.css'

type Activity = {
  title_pl: string
  title_en: string
  about_pl: string
  about_en: string
  speaker: string
  start: string
  end: string
  location_pl: string
  location_en: string
  type: string
}

type Workshop = {
  title_pl: string
  title_en: string
  speaker: string
  location_pl: string
  location_en: string
}

type DayObject = {
  day: number
  activities: Activity[]
  classes_start: string
  classes_end: string
  classes: Workshop[]
}

const timeFormat: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
}

function decideLanguage(pl: string, en: string) {
  const { i18n } = useTranslation()

  return i18n.language === 'pl' ? pl : en
}

function Row(props: { activity: Activity }) {
  const { activity } = props
  const { i18n, t } = useTranslation()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const isClickable =
    (activity.about_pl.length > 0 && i18n.language === 'pl') ||
    (activity.about_en.length > 0 && i18n.language === 'en')

  const color = theme.palette.primary.main

  const timeStart =
    activity.start.length == 0
      ? ''
      : new Date(Date.parse(activity.start)).toLocaleTimeString([], timeFormat)
  const timeEnd =
    activity.end.length == 0
      ? ''
      : new Date(Date.parse(activity.end)).toLocaleTimeString([], timeFormat)

  if (activity.type === 'session') {
    return (
      <TableRow
        sx={{ backgroundColor: color, cursor: 'pointer' }}
        onClick={() => window.open('/speakers', '_self')}
      >
        <TableCell colSpan={5}>
          <p className='session-header'>
            {decideLanguage(activity.title_pl, activity.title_en)}
          </p>
          {activity.speaker.length > 0 && (
            <p className='session-experts'>
              {t('program.Experts.Label')}: {activity.speaker}
            </p>
          )}
        </TableCell>
      </TableRow>
    )
  } else {
    return (
      <>
        <TableRow
          onClick={() => isClickable && setOpen(!open)}
          sx={{
            cursor: isClickable ? 'pointer' : 'auto',
            backgroundColor:
              activity.type === 'highlight'
                ? 'rgba(197, 61, 99, 0.10)'
                : 'white',
          }}
        >
          <TableCell sx={{ width: '5%' }}>
            {isClickable && (
              <IconButton
                aria-label='expand row'
                size='small'
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            )}
          </TableCell>
          <TableCell sx={{ width: '10%' }}>
            <>
              {timeStart}
              <br />
              {timeEnd}
            </>
          </TableCell>
          <TableCell sx={{ width: '45%' }}>
            {decideLanguage(activity.title_pl, activity.title_en)}
            {activity.type === 'lecture' && <i> +&nbsp;komentarz eksperta</i>}
          </TableCell>
          <TableCell sx={{ width: '35%' }}>
            {activity.type === 'normal' ? (
              <b>{activity.speaker}</b>
            ) : (
              activity.speaker
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              {activity.type === 'lecture' && (
                <p className='abstract-label'>{t('program.Abstract')}</p>
              )}
              <p className='abstract-paragraph'>
                {decideLanguage(activity.about_pl, activity.about_en)}
              </p>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    )
  }
}

function WorkshopsDetails(props: { workshops: Workshop[] }) {
  const { workshops } = props
  const { t } = useTranslation()

  return (
    <>
      <table className='inner-table'>
        <tr>
          <th style={{ width: '25%' }}>{t('program.Activity.Name')}</th>
          <th style={{ width: '25%' }}>{t('program.Activity.Speaker')}</th>
          <th style={{ width: '15%' }}>{t('program.Activity.Place')}</th>
        </tr>
        {workshops.map((value, index) => {
          return (
            <tr key={index}>
              <td>{decideLanguage(value.title_pl, value.title_en)}</td>
              <td>{value.speaker}</td>
              <td>{decideLanguage(value.location_pl, value.location_en)}</td>
            </tr>
          )
        })}
      </table>
    </>
  )
}

function WorkshopRow(props: { day: DayObject }) {
  const { day } = props

  if (day.classes.length == 0) {
    return <></>
  }

  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <>
      <TableRow
        onClick={() => setOpen(!open)}
        sx={{
          cursor: 'pointer',
          backgroundColor: 'rgba(197, 61, 99, 0.10)',
        }}
      >
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <>
            {new Date(Date.parse(day.classes_start)).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            <br />
            {new Date(Date.parse(day.classes_end)).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </>
        </TableCell>
        <TableCell colSpan={4}>{t('program.Activity.Workshops')}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <WorkshopsDetails workshops={day.classes} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

function Day(props: { day: DayObject }) {
  const { day } = props
  const { t } = useTranslation()

  day.activities.sort((a1, a2) => Date.parse(a1.start) - Date.parse(a2.start))

  return (
    <div className='day-container'>
      <p className='day-text'>
        {t('program.Day')} {day.day}
      </p>
      <TableContainer component={Paper} sx={{ width: '90%', marginLeft: '5%' }}>
        <Table aria-label='collapsible table'>
          <TableBody>
            {day.activities.map((value, index) => {
              return <Row activity={value} key={index} />
            })}
            <WorkshopRow day={day} />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

function HeaderImage() {
  const { t } = useTranslation()

  return (
    <div className='gray-divider'>
      <img className='wum-image' src='/static/images/wum.webp' />
      <div className='date-time-info'>
        <p className='text-primary text-primary-top'>
          {t('program.Date.Label')}
        </p>
        <p className='text-secondary'>{t('program.Date.Value')}</p>
        <p className='text-primary'>{t('program.Venue.Label')}</p>
        <p className='text-secondary'>
          {t('program.Venue.Value.Line1')}
          <br />
          {t('program.Venue.Value.Line2')}
        </p>
      </div>
    </div>
  )
}

function Program() {
  const programURL = process.env.PUBLIC_URL + '/static/program/program.json'

  const [days, setDays] = useState<DayObject[]>([])
  // 0 - not loaded
  // 1 - loaded
  // 2 - error
  const [loaded, setLoaded] = useState(0)

  useEffect(() => {
    fetch(programURL, { cache: 'no-store' })
      .then((res) => res.json())
      .then((json) => {
        setDays(json.days)
        setLoaded(1)
      })
      .catch((err) => {
        console.log(err)
        setLoaded(2)
      })
  }, [])

  if (loaded == 1) {
    return (
      <>
        <HeaderImage />
        {days.map((value, index) => {
          return <Day day={value} key={index} />
        })}
      </>
    )
  } else if (loaded == 2) {
    return (
      <>
        <HeaderImage />
        <p>Loading failed</p>
      </>
    )
  } else {
    return (
      <>
        <HeaderImage />
        <div className='program-loading-container'>
          <CircularProgress />
        </div>
      </>
    )
  }
}

export default Program
