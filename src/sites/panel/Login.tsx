import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthentication } from '../../utils/useAuthentication'

export default function LoginPage() {
  if (useAuthentication().token) {
    return <Navigate replace to={'/admin'} />
  }

  return <p>LoginPage</p>
}
