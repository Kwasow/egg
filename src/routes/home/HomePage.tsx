import React, { useEffect, useState } from 'react'
import { Button, Card, Grid, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Countdown } from '../../components/Countdown'
import { Slideshow, Slide } from '../../components/Slideshow'
import { NewsCard } from '../../utils/MUITheme'
import {
  competitionRegistrationLink,
  decideLanguage,
  News,
  NewsJSON,
  newsPrefix,
  rulesLink,
} from '../../components/Shared'
import './HomePage.css'
import { NewsDialog } from '../../components/Dialogs'

const slides: Slide[] = [
  {
    image: process.env.PUBLIC_URL + '/static/images/main0.webp',
    title_pl: 'IV Edycja - Sekrety onkologii',
    subtitle_pl: 'Kliknij by zobaczyć program wykładów i warsztatów',
    title_en: 'Secrets of oncology',
    subtitle_en: 'Click to view the conference program',
    link: '/speakers',
  },
  {
    image: process.env.PUBLIC_URL + '/static/images/main1.webp',
    title_pl: 'Lista mówców już dostępna!',
    subtitle_pl: 'Kliknij by dowiedzieć się więcej...',
    title_en: 'Speakers list is now available!',
    subtitle_en: 'Press to learn more...',
    link: '/speakers',
  },
  {
    image: process.env.PUBLIC_URL + '/static/images/main2.webp',
    title_pl: 'Zobacz zdjęcia z poprzednich edycji',
    subtitle_pl: 'Sprawdź w zakładce Galeria',
    title_en: 'See photos from previous edition',
    subtitle_en: 'Available in the Photos tab',
    link: '/photos',
  },
]

function Partner(props: {
  image: string
  title: string
  secondary?: string
  imageAlt: string
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { image, title, secondary, imageAlt } = props
  const alt = imageAlt === undefined ? title : ''

  return (
    <div className='single-partner-container'>
      <img
        src={process.env.PUBLIC_URL + image}
        alt={alt}
        className='partner-image'
      />
      <p className='partner-title'>{title}</p>
      <p className='partner-subtitle'>{secondary}</p>
    </div>
  )
}

function SponsorImage(props: { image: string; imageAlt: string }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { image, imageAlt } = props

  return (
    <img
      src={process.env.PUBLIC_URL + image}
      alt={imageAlt}
      className='sponsor-image'
    />
  )
}

function Sponsors() {
  const { t } = useTranslation()

  return (
    <>
      <p className='sponsors-header'>{t('mainPage.Patrons')}</p>
      <Grid container spacing={0} className='sponsors-container'>
        <Partner
          image='/static/sponsors/wum.webp'
          imageAlt={t('sponsor.WUM.Alt') || ''}
          title={t('sponsor.WUM.Title') || ''}
          secondary={t('sponsor.WUM.Subtitle') || ''}
        />
        <Partner
          image='/static/sponsors/lek.webp'
          imageAlt={t('sponsor.Lek.Alt') || ''}
          title={t('sponsor.Lek.Title') || ''}
          secondary={t('sponsor.Lek.Subtitle') || ''}
        />
        <Partner
          image='/static/sponsors/stn.webp'
          imageAlt={t('sponsor.STN.Alt') || ''}
          title={t('sponsor.STN.Title') || ''}
        />
        <Partner
          image='/static/sponsors/ss_wum.webp'
          imageAlt={t('sponsor.SSWUM.Alt') || ''}
          title={t('sponsor.SSWUM.Title') || ''}
        />
      </Grid>
      <Grid container spacing={0} className='sponsors-container'>
        <a href='https://medtube.pl' target='_blank' rel='noreferrer'>
          <SponsorImage
            image='/static/sponsors/medtube.png'
            imageAlt='MedTube logo'
          />
        </a>
        <SponsorImage
          image='/static/sponsors/opm.webp'
          imageAlt='Ogólnopolski Przegląd Medyczny logo'
        />
        <SponsorImage
          image='/static/sponsors/okregowa_izba.webp'
          imageAlt='Okręgowa Izba Lekarska w Warszawie im. Jana Nielubowicza'
        />
        <SponsorImage
          image='/static/sponsors/figo.webp'
          imageAlt='Polskie Towarzystwo Ginekologów i Położników logo'
        />
        <SponsorImage
          image='/static/sponsors/remedium.webp'
          imageAlt='Remedium logo'
        />
        <SponsorImage
          image='/static/sponsors/pars.webp'
          imageAlt='Ruch Społeczny Polskie Amazonki logo'
        />
        <SponsorImage
          image='/static/sponsors/termedia.png'
          imageAlt='Termedia logo'
        />
      </Grid>

      <p className='sponsors-header'>{t('mainPage.Sponsors')}</p>
      <Grid container spacing={0} className='sponsors-container'>
        <SponsorImage
          image='/static/sponsors/cocomed.webp'
          imageAlt='Cocomed logo'
        />
        <SponsorImage
          image='/static/sponsors/corpus_mind.webp'
          imageAlt='Corpus mind logo'
        />
        <SponsorImage
          image='/static/sponsors/edra.webp'
          imageAlt='Edra Urban & Partner logo'
        />
        <SponsorImage image='/static/sponsors/erbe.png' imageAlt='Erbe logo' />
        <SponsorImage
          image='/static/sponsors/ifmsa.webp'
          imageAlt='IFMSA logo'
        />
        <SponsorImage
          image='/static/sponsors/inwhite.webp'
          imageAlt='InWhite logo'
        />
        <SponsorImage
          image='/static/sponsors/ksm.webp'
          imageAlt='Fundacja Koło medyków logo'
        />
        <SponsorImage
          image='/static/sponsors/kangoomed.webp'
          imageAlt='Kangoomed logo'
        />
        <SponsorImage
          image='/static/sponsors/kwiat-kobiecosci.webp'
          imageAlt='Kwiat Kobiecości logo'
        />
        <SponsorImage
          image='/static/sponsors/lady_planer.webp'
          imageAlt='Lady planner logo'
        />
        <SponsorImage
          image='/static/sponsors/lepolek.png'
          imageAlt='Lepolek logo'
        />
        <SponsorImage
          image='/static/sponsors/medantlers.webp'
          imageAlt='Medantlers logo'
        />
        <SponsorImage
          image='/static/sponsors/medcases.png'
          imageAlt='Medcases logo'
        />
        <SponsorImage
          image='/static/sponsors/medelight.webp'
          imageAlt='Medelight logo'
        />
        <SponsorImage
          image='/static/sponsors/medesign.png'
          imageAlt='Medesign logo'
        />
        <SponsorImage
          image='/static/sponsors/medi-breath.webp'
          imageAlt='MediBreath logo'
        />
        <SponsorImage
          image='/static/sponsors/medipage.webp'
          imageAlt='MediPage logo'
        />
        <SponsorImage
          image='/static/sponsors/medpharm.webp'
          imageAlt='MedPharm Polska logo'
        />
        <SponsorImage
          image='/static/sponsors/meduses.webp'
          imageAlt='Meduses logo'
        />
        <SponsorImage
          image='/static/sponsors/mppl.webp'
          imageAlt='Medycyna Praktyczna mp.pl logo'
        />
        <SponsorImage
          image='/static/sponsors/nestmedic.webp'
          imageAlt='Nestmedic logo'
        />
        <SponsorImage
          image='/static/sponsors/noshi.webp'
          imageAlt='NOSHI logo'
        />
        <SponsorImage
          image='/static/sponsors/rozowa.webp'
          imageAlt='Różowa Skrzyneczka logo'
        />
        <SponsorImage
          image='/static/sponsors/sis.webp'
          imageAlt='Sis Underwear logo'
        />
        <SponsorImage
          image='/static/sponsors/skyn.webp'
          imageAlt='SKYN® logo'
        />
        <SponsorImage
          image='/static/sponsors/bear.webp'
          imageAlt='The White Bear Coffee logo'
        />
        <SponsorImage
          image='/static/sponsors/wnl.webp'
          imageAlt='Więcej niż LEK logo'
        />
        <SponsorImage
          image='/static/sponsors/wumshop.webp'
          imageAlt='WUMshop logo'
        />
      </Grid>
    </>
  )
}

function NewsTile(props: {
  news: News | undefined
  registration?: boolean
  onClick: () => void
}) {
  const { news, registration, onClick } = props
  const { i18n } = useTranslation()

  return (
    <NewsCard
      onClick={onClick}
      sx={{
        cursor: registration ? 'auto' : 'pointer',
      }}
    >
      <div
        className='news'
        style={{
          backgroundColor: registration ? '#c53d63' : '#e8e8e8',
        }}
      >
        <div>
          <img
            src={newsPrefix + news?.image}
            className='news-photo'
            loading='lazy'
          />
          <p
            className='news-title'
            style={{
              color: registration ? 'white' : 'black',
            }}
          >
            {decideLanguage(i18n.language, news?.title_pl, news?.title_en)}
          </p>
          <p
            className='news-content'
            style={{
              color: registration ? 'white' : 'black',
            }}
          >
            {decideLanguage(i18n.language, news?.text_pl[0], news?.text_en[0])}
          </p>
        </div>
        <p
          className='news-date'
          style={{
            color: registration ? 'lightgray' : 'darkgray',
          }}
        >
          {new Date(Date.parse(news?.date || '')).toLocaleDateString()}
        </p>
      </div>
    </NewsCard>
  )
}

function NewsSection() {
  const newsURL = newsPrefix + 'news.json'
  const [news, setNews] = useState<NewsJSON>()
  // 0 - not loaded
  // 1 - loaded
  // 2 - error
  const [loaded, setLoaded] = useState(0)
  const [dialogNews, setDialogNews] = useState<News | null>(null)
  const [newsDialogOpen, setNewsDialogOpen] = useState(false)

  useEffect(() => {
    fetch(newsURL, { cache: 'no-store' })
      .then((res) => res.json())
      .then((json: NewsJSON) => {
        json.other.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
        setNews(json)
        setLoaded(1)
      })
      .catch((err) => {
        console.error(err)
        setLoaded(2)
      })
  }, [])

  function closeDialog() {
    setNewsDialogOpen(false)
  }

  if (loaded == 1) {
    return (
      <Paper sx={{ overflow: 'auto' }}>
        <div className='news-container'>
          <NewsTile
            news={news?.registration}
            onClick={closeDialog}
            registration
          />
          {news?.other.map((value, index) => {
            return (
              <NewsTile
                key={index}
                news={value}
                onClick={() => {
                  setDialogNews(value)
                  setNewsDialogOpen(true)
                }}
              />
            )
          })}
        </div>
        <NewsDialog
          onClose={closeDialog}
          open={newsDialogOpen}
          news={dialogNews}
        />
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

function About() {
  const { t } = useTranslation()

  return (
    <div className='main-about-wrapper'>
      <Card
        className='main-about-card'
        sx={{ backgroundColor: 'rgb(197, 61, 99)' }}
      >
        <div className='main-about-card-content-wrapper'>
          <div>
            <p className='main-about-card-title' style={{ color: 'white' }}>
              {t('mainPage.AboutConferenceTitle')}
            </p>
            <p className='main-about-card-content' style={{ color: 'white' }}>
              {t('mainPage.AboutConference')}
            </p>
          </div>
        </div>
      </Card>
      <Card
        className='main-about-card'
        sx={{ backgroundColor: 'rgba(197, 61, 99, 0.15)' }}
      >
        <div className='main-about-card-content-wrapper'>
          <div>
            <p className='main-about-card-title'>
              {t('mainPage.AboutCompetitionTitle')}
            </p>
            <p className='main-about-card-content'>
              {t('mainPage.AboutCompetition')}
            </p>
          </div>
          <div className='main-about-card-button-wrapper'>
            <Button
              variant='contained'
              onClick={() =>
                window.open(rulesLink + '?cachePrevent=' + Date.now())
              }
            >
              {t('mainPage.ConferenceRules')}
            </Button>
            <Button
              variant='contained'
              onClick={() => window.open(competitionRegistrationLink)}
            >
              {t('navbar.Register')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

function HomePage() {
  return (
    <>
      <Slideshow slides={slides} />
      <Countdown date={new Date('2023-04-14T16:00:00+02:00')} />
      <NewsSection />
      <About />
      <Sponsors />
    </>
  )
}

export default HomePage
