import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthentication } from '../../utils/useAuthentication'

export default function AdminHome() {
  const authentication = useAuthentication()

  if (!authentication.token) {
    return <Navigate replace to={'/login'} />
  }

  return <p>AdminHome</p>
}
