import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import './Footer.css'
import { FacebookIconLink, InstagramIconLink } from './Shared'

function Footer() {
  const { t } = useTranslation()
  const [smallScreen, setSmallScreen] = useState(false)

  function updateScreenSize() {
    if (window.innerWidth < 1100) {
      setSmallScreen(true)
    } else {
      setSmallScreen(false)
    }
  }
  window.addEventListener('resize', updateScreenSize)
  useEffect(updateScreenSize, [])

  return (
    <footer>
      <div className='footer-container'>
        <div className='footer-top'>
          <p className='conference-title'>{t('navbar.Title.Line1')}</p>
          <p className='conference-subtitle'>{t('navbar.Title.Line2')}</p>
        </div>
        <div className='footer-bottom'>
          <div className='footer-bottom-left'>
            <div className='footer-contact'>
              <p className='contact-title'>{t('footer.Contact')}</p>
              <a
                href='mailto:konsekretyonkologii4takt@gmail.com'
                className='contact white-link'
              >
                sekretyonkologii4@gmail.com<br></br>
              </a>
              <div className='social-container'>
                <FacebookIconLink white={true} />
                <InstagramIconLink white={true} />
              </div>
            </div>
            <div className='footer-contact'>
              <p className='contact' style={{ fontStyle: 'italic' }}>
                Studenckie Koło Naukowe <br />
                przy II Katedrze Ginekologii i Położnictwa <br />
                Warszawskiego Uniwersytetu Medycznego
              </p>
              <p className='contact'>ul. Karowa 2</p>
              <p className='contact'>00-315 Warszawa</p>
              <p className='contact'></p>
            </div>
          </div>
          {!smallScreen && (
            <div className='footer-bottom-right'>
              <p className='copyright-text'>{t('footer.Copyright')}</p>
            </div>
          )}
        </div>
        {smallScreen && (
          <p className='copyright-text'>{t('footer.Copyright')}</p>
        )}
      </div>
    </footer>
  )
}

export default Footer
