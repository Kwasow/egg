import React from 'react'
import {
  LoginProtected,
  useAuthentication,
} from '../../utils/useAuthentication'

export default function AdminHome() {
  const authentication = useAuthentication()

  return (
    <LoginProtected>
      <p>AdminHome</p>
      <p>Your username is {authentication.tokenDetails?.username}</p>
      <p>Your token is {authentication.tokenDetails?.tokenDetails}</p>
    </LoginProtected>
  )
}
