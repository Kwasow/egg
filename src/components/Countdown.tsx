import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds:number;
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
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(props.date))
  const {t, } = useTranslation()

  React.useEffect(() => {
    const id = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(props.date))
    }, 1000)

    return () => {
      clearTimeout(id)
    }
  })

  const timerComponents = new Array<JSX.Element>(4)
  timerComponents.push(
    <span>
      {timeLeft.days} {t('countdown.Days')}{' '}
    </span>
  )
  timerComponents.push(
    <span>
      {timeLeft.hours} {t('countdown.Hours')}{' '}
    </span>
  )
  timerComponents.push(
    <span>
      {timeLeft.minutes} {t('countdown.Minutes')}{' '}
    </span>
  )
  timerComponents.push(
    <span>
      {timeLeft.seconds} {t('countdown.Seconds')}{' '}
    </span>
  )

  return (
    <div>
      <p>
        {
          timerComponents.length
            ? timerComponents
            : <span>Time&apos;s up!</span>
        }
      </p>
    </div>
  )
}
