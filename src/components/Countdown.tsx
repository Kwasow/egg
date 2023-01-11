import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './Countdown.css'

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds:number;
}

function getNumberString(num: number): string {
  if (num < 10) {
    return '0' + num
  } else {
    return num.toString()
  }
}

function calculateTimeLeft(date: Date) {
  const difference = +date - +new Date()
  let timeLeft: TimeLeft

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
  } else {
    timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return timeLeft
}

export function Countdown(props: {
  date: Date
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(props.date))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {t} = useTranslation()

  React.useEffect(() => {
    const id = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(props.date))
    }, 1000)

    return () => {
      clearTimeout(id)
    }
  })

  return <div className='countdown-wrapper'>
    <div className='countdown-element'>
      <p className='countdown-count'>{getNumberString(timeLeft.days)}</p>
      <p className='countdown-label'>{t('countdown.Days')}</p>
    </div>
    <div className='countdown-element'>
      <p className='countdown-count'>{getNumberString(timeLeft.hours)}</p>
      <p className='countdown-label'>{t('countdown.Hours')}</p>
    </div>
    <div className='countdown-element'>
      <p className='countdown-count'>{getNumberString(timeLeft.minutes)}</p>
      <p className='countdown-label'>{t('countdown.Minutes')}</p>
    </div>
    <div className='countdown-element'>
      <p className='countdown-count'>{getNumberString(timeLeft.seconds)}</p>
      <p className='countdown-label'>{t('countdown.Seconds')}</p>
    </div>
  </div>
}
