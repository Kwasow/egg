import React, { useState } from 'react'
import { Countdown } from '../components/Countdown'
import { Slideshow, Slide } from '../components/Slideshow'
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
    <img src={image} alt={alt} className='sponsor-logo'/>
    {title ? <p className='sponsor-subtext'>{title}</p> : <></>}
  </div>
}

function Sponsors() {
  return <>
    <p className='sponsors-header'>Partnerzy</p>
    <div className='sponsors-container'>
      <SponsorImage 
        image={process.env.PUBLIC_URL + '/static/sponsors/wum.png'}
        title='Rektor Warszawskiego Uniwersytetu Medycznego'/>
    </div>
    <p className='sponsors-header'>Sponsorzy</p>
    <div className='sponsors-container'>

    </div>
  </>
}

function News() {
  const newsURL = 'static/news/news.json'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [news, setNews] = useState<NewsJSON>()
  const [loaded, setLoaded] = useState(0)

  fetch(newsURL)
    .then((res) => res.json())
    .then((json: NewsJSON) => {
      // 0 - not loaded
      // 1 - loaded
      // 2 - error
      setNews(json)
      setLoaded(1)
    })
    .catch((err) => {
      console.error(err)
      setLoaded(2)
    })

  if (loaded == 1) {
    return <div className='news-container'>
      <div className='news-registration'>

      </div>
    </div>
  } else if (loaded == 2) {
    return <div className='news-container'></div>
  } else {
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
