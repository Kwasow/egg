import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSwipeable } from 'react-swipeable'
import i18n from '../../../utils/i18n'
import './Slideshow.css'

const delay = 15000

export type Slide = {
  image: string
  title_pl: string
  subtitle_pl: string
  title_en: string
  subtitle_en: string
  link: string
}

export function Slideshow(props: { slides: Slide[] }) {
  const { slides } = props

  const [index, setIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { t } = useTranslation()

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(
      () => setIndex((prevIndex) => (prevIndex + 1) % slides.length),
      delay
    )

    return () => {
      resetTimeout()
    }
  }, [index])

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setIndex((prevIndex) => (prevIndex + 1) % slides.length),
    onSwipedRight: () =>
      setIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length),
  })

  return (
    <div className='slideshow' {...handlers}>
      <div
        className='slideshowSlider'
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {slides.map((slide, index) => (
          <a className='slide' key={index} href={slide.link}>
            <img
              className='slide-image'
              src={slide.image}
              alt={t('slideshow.BackgroundPhoto.Alt') || ''}
            />
            <div className='slide-textBox'>
              <p className='slide-title'>
                {i18n.language == 'pl' ? slide.title_pl : slide.title_en}
              </p>
              <p className='slide-subtitle'>
                {i18n.language == 'pl' ? slide.subtitle_pl : slide.subtitle_en}
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className='slideshowDots'>
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? ' active' : ''}`}
            onClick={() => {
              setIndex(idx)
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}
