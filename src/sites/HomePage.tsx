import React, { useEffect, useState } from 'react'
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
    link: '/speakers'
  },
  {
    image: process.env.PUBLIC_URL + '/static/images/main1.jpeg',
    title_pl: 'Lista mówców już dostępna!',
    subtitle_pl: 'Kliknij by dowiedzieć się więcej...',
    title_en: 'Speakers list is now available!',
    subtitle_en: 'Press to learn more...',
    link: '/speakers'
  },
  {
    image: process.env.PUBLIC_URL + '/static/images/main3.jpeg',
    title_pl: 'Zobacz zdjęcia z poprzednich edycji',
    subtitle_pl: 'Sprawdź w zakładce Galeria',
    title_en: 'See photos from previous edition',
    subtitle_en: 'Available in the Photos tab',
    link: '/photos'
  }
]

interface News {
  title_pl: string;
  title_en: string;
  text_pl: string;
  text_en: string;
  image: string;
  date: string;
}

interface NewsJSON {
  registration: News;
  other: News[];
}

function SponsorImage(props: {
  image: string,
  title?: string
  imageAlt?: string,
}) {
  const {image, imageAlt, title} = props
  const alt = imageAlt === undefined ? title : ''

  return <div className='single-sponsor-container'>
    <img 
      src={process.env.PUBLIC_URL + image}
      alt={alt}
      style={{
        height: 250,
        objectFit: 'contain'
      }}/>
    <p style={{
      textAlign: 'center',
      fontSize: 'large',
      fontWeight: 'lighter'
    }}>{title}</p>
  </div>
}

function Sponsors() {
  return <>
    <p className='sponsors-header'>Partnerzy</p>
    <div className='sponsors-container'>
      <SponsorImage 
        image='/static/sponsors/wum.png'
        title='Warszawski Uniwersytet Medyczny'/>
      <SponsorImage 
        image='/static/sponsors/lek.png'
        title='Wydział Lekarski Warszawskiego Uniwersytetetu Medycznego'/>
    </div>
    <p className='sponsors-header'>Sponsorzy</p>
    <div className='sponsors-container'>
      <SponsorImage image='/static/sponsors/stn.png'/>
      <SponsorImage image='/static/sponsors/wnl.png'/>
      <SponsorImage image='/static/sponsors/mns.png'/>
      <SponsorImage image='/static/sponsors/ifmsa.png'/>
    </div>
    <div className='sponsors-container'>
      <SponsorImage image='/static/sponsors/dr_kitel.png'/>
      <SponsorImage image='/static/sponsors/mp.png'/>
      <SponsorImage image='/static/sponsors/pzwl.png'/>
      <SponsorImage image='/static/sponsors/lepolek.png'/>
    </div>
  </>
}

function News() {
  const newsPrefix = 'static/news/'
  const newsURL = newsPrefix + 'news.json'
  const [news, setNews] = useState<NewsJSON>()
  // 0 - not loaded
  // 1 - loaded
  // 2 - error
  const [loaded, setLoaded] = useState(0)

  useEffect(() => {
    fetch(newsURL)
      .then((res) => res.json())
      .then((json: NewsJSON) => {
        setNews(json)
        console.log(json)
        setLoaded(1)
      })
      .catch((err) => {
        console.error(err)
        setLoaded(2)
      })
  }, [])

  if (loaded == 1) {
    return <div className='news-container'>
      <NewsCard>
        <div className='news-registration'>
          <img
            src={newsPrefix + news?.registration.image}
            className='registration-photo'/>
          <div className='registration-right'>
            <div>
              <p className='registration-title'>
                {news?.registration.title_pl}
              </p>
              <p className='registration-content'>
                {news?.registration.text_pl}
              </p>
            </div>
            <p className='registration-date'>{
              new Date(
                Date.parse(news?.registration.date || '')
              ).toLocaleDateString()
            }</p>
          </div>
        </div>
      </NewsCard>
      {news?.other.map((value, index) => {
        return <NewsCard key={index}>
          <div className='news-other'>
            <div>
              <img
                src={newsPrefix + value.image}
                className='other-photo'/>
              <p className='other-title'>
                {value.title_pl}
              </p>
              <p className='other-content'>
                {value.text_pl}
              </p>
            </div>
            <p className='other-date'>{
              new Date(Date.parse(value.date)).toLocaleDateString()
            }</p>
          </div>
        </NewsCard>
      })}
    </div>
  } else if (loaded == 2) {
    // TODO
    return <div className='news-container'></div>
  } else {
    // TODO
    return <div className='news-container'></div>
  }
}

function HomePage() {
  return <>
    <Slideshow slides={slides}/>
    {/* TODO: Conference date */}
    <Countdown date={new Date('2023-04-15T18:00:00')}/>
    <News/>
    <Sponsors/>
  </>
}

export default HomePage
