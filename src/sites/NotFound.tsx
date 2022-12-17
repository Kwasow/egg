import React from 'react'
import { useTranslation } from 'react-i18next'
import './NotFound.css'

function NotFound() {
  const {t} = useTranslation()

  return <>
    <div className='container'>
      <img className='ghost-icon' src='static/images/ghost.svg' />
      <p className='error-boo'>{t('notFound.boo')}</p>
      <p className='error-text'>{t('notFound.message')}</p>
    </div>
  </>
}

export default NotFound
