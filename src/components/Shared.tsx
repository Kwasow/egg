import React from 'react'
import './Shared.css'

export const imageUrl = process.env.PUBLIC_URL + '/static/images/'

export function FacebookIconLink(props: {
  style?: React.CSSProperties,
  white?: boolean
}) {
  return <a
    href='https://www.facebook.com/'
    target='_blank'
    rel='noreferrer'
    style={props.style}>
    <img
      className={props.white ? 'svg-white' : 'svg-default'}
      src={imageUrl + 'facebook.svg'} />
  </a>
}

export function InstagramIconLink(props: {
  style?: React.CSSProperties,
  white?: boolean
}) {
  return <a
    href='https://www.instagram.com'
    target='_blank'
    rel='noreferrer'
    {...props}>
    <img
      className={props.white ? 'svg-white' : 'svg-default'}
      src={imageUrl + 'instagram.svg'} />
  </a>
}