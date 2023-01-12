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
  TableHead,
  TableRow
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useTranslation } from 'react-i18next'
import './Program.css'

type Activity = {
  type: string,
  title_pl: string,
  title_en: string,
  about_pl: string,
  about_en: string,
  speaker: string,
  start: string,
  end: string,
  location_pl: string,
  location_en: string
}

type DayObject = {
  day: number
  activities: Activity[]
}

function decideLanguage(pl: string, en: string) {
  const {i18n} = useTranslation()

  return i18n.language === 'pl' ? pl : en
}

function Row(props: {
  activity: Activity
}) {
  const {activity} = props
  const [open, setOpen] = useState(false)

  if (activity.type === 'other') {
    return <TableRow>
      <TableCell colSpan={5} align={'center'}>
        <>
          {decideLanguage(activity.title_pl, activity.title_en)}<br/>
          {new Date(Date.parse(activity.start)).toLocaleTimeString(
            [], {hour: '2-digit', minute: '2-digit'})}
          {' '}-{' '}
          {new Date(Date.parse(activity.start)).toLocaleTimeString(
            [], {hour: '2-digit', minute: '2-digit'})}
        </>
      </TableCell>
    </TableRow>
  } else {
    return <>
      <TableRow onClick={() => setOpen(!open)} sx={{ cursor: 'pointer' }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <>
            {new Date(Date.parse(activity.start)).toLocaleTimeString(
              [], {hour: '2-digit', minute: '2-digit'})}<br/>
            {new Date(Date.parse(activity.end)).toLocaleTimeString(
              [], {hour: '2-digit', minute: '2-digit'})}
          </>
        </TableCell>
        <TableCell>
          {decideLanguage(activity.title_pl, activity.title_en)}
        </TableCell>
        <TableCell>
          {activity.speaker}
        </TableCell>
        <TableCell>
          {decideLanguage(activity.location_pl, activity.location_en)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <p style={{ margin: '2%', textAlign: 'justify' }}>
              {decideLanguage(activity.about_pl, activity.about_en)}
            </p>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  }
}

function ActivityRows(props: {
  activities: Activity[]
}) {
  const {t} = useTranslation()

  return <TableContainer
    component={Paper}
    sx={{ width: '90%', marginLeft: '5%' }}
  >
    <Table aria-label='collapsible table'>
      <TableHead>
        <TableRow sx={{ backgroundColor: 'rgba(197, 61, 99, 0.30)' }}>
          <TableCell sx={{ width: '5%' }}/>
          <TableCell sx={{ width: '10%' }}>
            {t('program.Activity.Time')}</TableCell>
          <TableCell sx={{ width: '35%' }}>
            {t('program.Activity.Name')}</TableCell>
          <TableCell sx={{ width: '15%' }}>
            {t('program.Activity.Speaker')}</TableCell>
          <TableCell sx={{ width: '35%' }}>
            {t('program.Activity.Place')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.activities.map((value, index) => {
          return <Row activity={value} key={index} />
        })}
      </TableBody>
    </Table>
  </TableContainer>
}

function Day(props: {
  day: DayObject
}) {
  const {day} = props
  const {t} = useTranslation()

  day.activities.sort((a1, a2) => Date.parse(a1.start) - Date.parse(a2.start))

  const primaryActivities = day.activities.filter(
    (value) => value.type !== 'class')
  const classActivities = day.activities.filter(
    (value) => value.type === 'class')

  return <div className='day-container'>
    <p className='day-text'>{t('program.Day')} {day.day}</p>
    {primaryActivities.length > 0
      ? <ActivityRows activities={primaryActivities} />
      : <p className='no-activity-text'>
        {t('program.Activity.NoLecturePlanned')}
      </p>
    }
    <p className='seminar-text'>{t('program.Activity.Seminars')}</p>
    {classActivities.length > 0
      ? <ActivityRows activities={classActivities} />
      : <p className='no-activity-text'>
        {t('program.Activity.NoSeminarPlanned')}
      </p>
    }
  </div>
}

function PictureProgram() {
  const {t} = useTranslation()
  const programImageURL = process.env.PUBLIC_URL + '/static/images/program.png'

  return <div className='gray-divider'>
    <div className='left-container'>
      <div>
        <p className='text-primary text-primary-top'>
          {t('program.Date.Label')}</p>
        <p className='text-secondary'>{t('program.Date.Value')}</p>
        <p className='text-primary'>{t('program.Venue.Label')}</p>
        <p className='text-secondary'>
          {t('program.Venue.Value.Line1')}<br/>
          {t('program.Venue.Value.Line2')}
        </p>
      </div>
    </div>
    <img style={{ height: '400px' }} src={programImageURL}/>
  </div>
}

function Program() {
  const programURL = '/static/program/program.json'

  const [days, setDays] = useState<DayObject[]>([])
  // 0 - not loaded
  // 1 - loaded
  // 2 - error
  const [loaded, setLoaded] = useState(0)

  useEffect(() => {
    fetch(programURL)
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
    return <>
      <PictureProgram />
      {days.map((value, index) => {
        return <Day day={value} key={index} />
      })}
    </>
  } else if (loaded == 2) {
    return <>
      <PictureProgram />
      <p>Loading failed</p>
    </>
  } else {
    return <>
      <PictureProgram />
      <div className='program-loading-container'>
        <CircularProgress />
      </div>
    </>
  }
}

export default Program
