import React from 'react'
import { Countdown } from '../components/Countdown'
import { Slideshow } from '../components/Slideshow'
import './HomePage.css'

function HomePage() {
  return <>
    <Slideshow />
    {/* TODO: Conference date */}
    <Countdown date={new Date('2023-04-15T18:00:00')}/>
  </>
}

export default HomePage
