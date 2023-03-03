import { useState } from 'react'

export function useAuthentication() {
  function getToken(): string | null {
    const tokenString = localStorage.getItem('token')
    return tokenString
  }

  const [token, setToken] = useState(getToken())

  function saveToken(token: string) {
    localStorage.setItem('token', token)
    setToken(token)
  }

  return {
    setToken: saveToken,
    token,
  }
}
