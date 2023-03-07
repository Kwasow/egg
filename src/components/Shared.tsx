import React from 'react'
import './Shared.css'

export const imageUrl = process.env.PUBLIC_URL + '/static/images/'
export const newsPrefix = process.env.PUBLIC_URL + 'static/news/'

export const conferenceRegistrationLink = 'https://forms.gle/wTtXxs4Y5smXFzrs5'
export const competitionRegistrationLink = 'https://forms.gle/fuuxtqesUna84M2r7'
export const rulesLink = '/static/documents/regulamin.pdf'

export interface News {
  title_pl: string
  title_en: string
  text_pl: string[]
  text_en: string[]
  image: string
  date: string
}

export interface NewsJSON {
  registration: News
  other: News[]
}

export function decideLanguage(
  lang: string,
  pl: string | undefined,
  en: string | undefined
) {
  return lang === 'pl' ? pl : en
}

export function FacebookIconLink(props: {
  style?: React.CSSProperties
  white?: boolean
}) {
  const { style, white } = props

  return (
    <a
      href='https://www.facebook.com/weekendzginekologia'
      target='_blank'
      rel='noreferrer'
      style={style}
    >
      <img
        className={white ? 'svg-white' : 'svg-default'}
        src={imageUrl + 'facebook.svg'}
      />
    </a>
  )
}

export function InstagramIconLink(props: {
  style?: React.CSSProperties
  white?: boolean
}) {
  const { style, white } = props

  return (
    <a
      href='https://www.instagram.com/sknkarowa/'
      target='_blank'
      rel='noreferrer'
      style={style}
    >
      <img
        className={white ? 'svg-white' : 'svg-default'}
        src={imageUrl + 'instagram.svg'}
      />
    </a>
  )
}
