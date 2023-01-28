import React from 'react'

export const imageUrl = process.env.PUBLIC_URL + '/static/images/'

export function FacebookIconLink(props: {
  style?: React.CSSProperties
}) {
  return <a
    href='https://www.facebook.com/'
    target='_blank'
    rel='noreferrer'
    {...props}>
    <img
      className='appbar-right-top-svg'
      src={imageUrl + 'facebook.svg'} />
  </a>
}

export function InstagramIconLink(props: {
  style?: React.CSSProperties
}) {
  return <a
    href='https://www.instagram.com'
    target='_blank'
    rel='noreferrer'
    {...props}>
    <img
      className='appbar-right-top-svg'
      src={imageUrl + 'instagram.svg'} />
  </a>
}