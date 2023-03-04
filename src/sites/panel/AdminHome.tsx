import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthentication } from '../../utils/useAuthentication'

export default function AdminHome() {
  const authentication = useAuthentication()

  if (!authentication.token) {
    return <Navigate replace to={'/login'} />
  } else {
    // TODO: Check if token valid - maybe external function
  }

  return (
    <>
      <p>AdminHome</p>
      <p>Your username is {authentication.token.username}</p>
      <p>Your token is {authentication.token.token}</p>
    </>
  )
}
