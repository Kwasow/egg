import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import './Program.css'



function Day()

function Program() {
  const {t, i18n} = useTranslation()
  const polish = i18n.language === 'pl'

  const programImageURL = process.env.PUBLIC_URL + '/static/images/program.png'
  const programURL = '/static/program/program.json'

  const [days, setDays] = useState([])

  useEffect(() => {
    fetch(programURL)
      .then((res) => res.json())
  }, [])

  return <>
    <div className='gray-divider'>
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
    {}
  </>
}

export default Program
