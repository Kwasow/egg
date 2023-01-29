import React from 'react'
import { useTranslation } from 'react-i18next'

import './Footer.css'
import { FacebookIconLink, InstagramIconLink } from './Shared'

function Footer() {
  const {t} = useTranslation()

  return <footer>
    <div className='footer-container'>
      <div className='footer-top'>
        <p className='conference-title'>{t('navbar.Title.Line1')}</p>
        <p className='conference-subtitle'>{t('navbar.Title.Line2')}</p>
      </div>
      <div className='footer-bottom'>
        <div className='footer-bottom-left'>
          <div className='footer-contact'>
            <p className='contact-title'>Kontakt</p>
            <a
              href='mailto:kontakt@weekendzginekologia.pl'
              className='contact'>sknkarowa2@gmail.com<br></br></a>
            <FacebookIconLink white={true}/>
            <InstagramIconLink white={true}/>
          </div>
          <div className='footer-contact'>
            <p className='contact-title'>Dane koła</p>
            <p className='contact' style={{ fontStyle: 'italic' }}>
              Studenckie Koło Naukowe <br/> 
              przy II Katedrze Ginekologii i Położnictwa <br/>
              Warszawskiego Uniwersytetu Medycznego
            </p>
            <p className='contact'>ul. Karowa 2</p>
            <p className='contact'>00-315 Warszawa</p>
            <p className='contact'></p>
          </div>
        </div>
        <div className='footer-bottom-right'>
          <p className='copyright-text'>{t('footer.copyright')}</p>
        </div>
      </div>
    </div>
  </footer>
}

export default Footer