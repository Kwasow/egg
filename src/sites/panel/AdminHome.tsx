import React from 'react'
import { Navigate } from 'react-router-dom'
import {
  loginProtectedPreload,
  useAuthentication,
} from '../../utils/useAuthentication'

export default function AdminHome() {
  loginProtectedPreload()

  const authentication = useAuthentication()

  if (!authentication.tokenDetails) {
    return <Navigate replace to={'/login'} />
  }

  return (
    <>
      <p>AdminHome</p>
      <p>Your username is {authentication.tokenDetails.username}</p>
      <p>Your token is {authentication.tokenDetails.tokenDetails}</p>
    </>
  )
}
