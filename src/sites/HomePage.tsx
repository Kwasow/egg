import React, { useEffect, useState } from 'react'
import { Grid, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Countdown } from '../components/Countdown'
import { Slideshow, Slide } from '../components/Slideshow'
import { NewsCard } from '../utils/MUITheme'
import './HomePage.css'

const slides: Slide[] = [
  {
    image: process.env.PUBLIC_URL + '/static/images/main0.png',
    title_pl: 'IV Edycja - Sekrety onkologii',
    subtitle_pl: 'Kliknij by zobaczyć program wykładów i warsztatów',
    title_en: 'Secrets of oncology',
    subtitle_en: 'Click to view the conference program',
    link: '/speakers',
  },
  {
    image: process.env.PUBLIC_URL + '/static/images/main1.jpg',
    title_pl: 'Lista mówców już dostępna!',
    subtitle_pl: 'Kliknij by dowiedzieć się więcej...',
    title_en: 'Speakers list is now available!',
    subtitle_en: 'Press to learn more...',
    link: '/speakers',
  },
  {
    image: process.env.PUBLIC_URL + '/static/images/main2.jpg',
    title_pl: 'Zobacz zdjęcia z poprzednich edycji',
    subtitle_pl: 'Sprawdź w zakładce Galeria',
    title_en: 'See photos from previous edition',
    subtitle_en: 'Available in the Photos tab',
    link: '/photos',
  },
]

interface News {
  title_pl: string
  title_en: string
  text_pl: string
  text_en: string
  image: string
  date: string
}

interface NewsJSON {
  registration: News
  other: News[]
}

function decideLanguage(
  language: string,
  pl: string | undefined,
  en: string | undefined
) {
  return language === 'pl' ? pl : en
}

function SponsorImage(props: {
  image: string
  title?: string
  secondary?: string
  imageAlt?: string
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { image, title, secondary, imageAlt } = props
  const alt = imageAlt === undefined ? title : ''

  return (
    <div className='single-sponsor-container'>
      <img
        src={process.env.PUBLIC_URL + image}
        alt={alt}
        className='sponsor-image'
      />
      <p className='sponsor-title'>{title}</p>
      <p className='sponsor-subtitle'>{secondary}</p>
    </div>
  )
}

function Sponsors() {
  const { t } = useTranslation()

  return (
    <>
      <p className='sponsors-header'>{t('mainPage.Partners')}</p>
      <Grid container spacing={0} className='sponsors-container'>
        <SponsorImage
          image='/static/sponsors/wum.png'
          imageAlt={t('sponsor.WUM.Alt') || ''}
          title={t('sponsor.WUM.Title') || ''}
          secondary={t('sponsor.WUM.Subtitle') || ''}
        />
        <SponsorImage
          image='/static/sponsors/lek.png'
          imageAlt={t('sponsor.Lek.Alt') || ''}
          title={t('sponsor.Lek.Title') || ''}
          secondary={t('sponsor.Lek.Subtitle') || ''}
        />
        <SponsorImage
          image='/static/sponsors/stn.png'
          imageAlt={t('sponsor.STN.Alt') || ''}
          title={t('sponsor.STN.Title') || ''}
        />
      </Grid>
      {/* NOTE: Temporarily removed as we don't have any sponsors yet */}
      {/* <p className='sponsors-header'>{t('mainPage.Sponsors')}</p>
    <div className='sponsors-container'>
      
    </div> */}
    </>
  )
}

function News() {
  const newsPrefix = process.env.PUBLIC_URL + 'static/news/'
  const newsURL = newsPrefix + 'news.json'
  const { i18n } = useTranslation()
  const [news, setNews] = useState<NewsJSON>()
  // 0 - not loaded
  // 1 - loaded
  // 2 - error
  const [loaded, setLoaded] = useState(0)
  const [smallScreen, setSmallScreen] = useState(false)

  function updateScreenSize() {
    if (window.innerWidth < 500) {
      setSmallScreen(true)
    } else {
      setSmallScreen(false)
    }
  }
  window.addEventListener('resize', updateScreenSize)
  useEffect(updateScreenSize, [])

  useEffect(() => {
    fetch(newsURL)
      .then((res) => res.json())
      .then((json: NewsJSON) => {
        setNews(json)
        setLoaded(1)
      })
      .catch((err) => {
        console.error(err)
        setLoaded(2)
      })
  }, [])

  function RegistrationBig() {
    return (
      <NewsCard>
        <div className='news-registration'>
          <img
            src={newsPrefix + news?.registration.image}
            className='registration-photo'
          />
          <div className='registration-right'>
            <div>
              <p className='registration-title'>
                {decideLanguage(
                  i18n.language,
                  news?.registration.title_pl,
                  news?.registration.title_en
                )}
              </p>
              <p className='registration-content'>
                {decideLanguage(
                  i18n.language,
                  news?.registration.text_pl,
                  news?.registration.text_en
                )}
              </p>
            </div>
            <p className='registration-date'>
              {new Date(
                Date.parse(news?.registration.date || '')
              ).toLocaleDateString()}
            </p>
          </div>
        </div>
      </NewsCard>
    )
  }

  function RegistrationSmall() {
    return (
      <NewsCard>
        <div
          className='news-other'
          style={{
            backgroundColor: '#c53d63',
          }}
        >
          <div>
            <img
              src={newsPrefix + news?.registration.image}
              className='other-photo'
            />
            <p className='other-title' style={{ color: 'white' }}>
              {decideLanguage(
                i18n.language,
                news?.registration.title_pl,
                news?.registration.title_en
              )}
            </p>
            <p className='other-content' style={{ color: 'white' }}>
              {decideLanguage(
                i18n.language,
                news?.registration.text_pl,
                news?.registration.text_en
              )}
            </p>
          </div>
          <p className='other-date' style={{ color: 'white' }}>
            {new Date(
              Date.parse(news?.registration.date || '')
            ).toLocaleDateString()}
          </p>
        </div>
      </NewsCard>
    )
  }

  if (loaded == 1) {
    return (
      <Paper sx={{ overflow: 'auto' }}>
        <div className='news-container'>
          {smallScreen ? <RegistrationSmall /> : <RegistrationBig />}
          {news?.other.map((value, index) => {
            return (
              <NewsCard key={index}>
                <div className='news-other'>
                  <div>
                    <img
                      src={newsPrefix + value.image}
                      className='other-photo'
                    />
                    <p className='other-title'>
                      {decideLanguage(
                        i18n.language,
                        value.title_pl,
                        value.title_en
                      )}
                    </p>
                    <p className='other-content'>
                      {decideLanguage(
                        i18n.language,
                        value.text_pl,
                        value.text_en
                      )}
                    </p>
                  </div>
                  <p className='other-date'>
                    {new Date(Date.parse(value.date)).toLocaleDateString()}
                  </p>
                </div>
              </NewsCard>
            )
          })}
        </div>
      </Paper>
    )
  } else if (loaded == 2) {
    // TODO
    return <div className='news-container'></div>
  } else {
    // TODO
    return <div className='news-container'></div>
  }
}

function HomePage() {
  return (
    <>
      <Slideshow slides={slides} />
      <Countdown date={new Date('2023-04-14T16:00:00+02:00')} />
      <News />
      <Sponsors />
    </>
  )
}

export default HomePage
