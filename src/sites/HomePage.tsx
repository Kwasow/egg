import React from 'react'
import { Countdown } from '../components/Countdown'
import { Slideshow, Slide } from '../components/Slideshow'
import './HomePage.css'

const slides: Slide[] = [
  {
    image: process.env.PUBLIC_URL + '/static/images/main0.png',
    title_pl: 'VI Edycja - Sekrety onkologii',
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

function HomePage() {
  return <>
    <Slideshow slides={slides}/>
    {/* TODO: Conference date */}
    <Countdown date={new Date('2023-04-15T18:00:00')}/>
  </>
}

export default HomePage
