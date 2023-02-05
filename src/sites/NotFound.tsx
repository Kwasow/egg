import React from 'react'
import { useTranslation } from 'react-i18next'
import './NotFound.css'

function NotFound() {
  const { t } = useTranslation()

  return (
    <>
      <div className='container'>
        <img
          className='ghost-icon'
          src={process.env.PUBLIC_URL + 'static/images/ghost.svg'}
        />
        <p className='error-boo'>{t('notFound.Boo')}</p>
        <p className='error-text'>{t('notFound.Message')}</p>
      </div>
    </>
  )
}

export default NotFound
