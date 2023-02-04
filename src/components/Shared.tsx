import React from 'react'
import './Shared.css'

export const imageUrl = process.env.PUBLIC_URL + '/static/images/'

export function FacebookIconLink(props: {
  style?: React.CSSProperties
  white?: boolean
}) {
  const { style, white } = props

  return (
    <a
      href='https://www.facebook.com/profile.php?id=100057690391510'
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
