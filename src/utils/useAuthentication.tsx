import { useState } from 'react'

type TokenDetails = {
  username: string
  token: string
}

export function useAuthentication() {
  function getToken(): TokenDetails | null {
    const tokenString = localStorage.getItem('token')

    if (tokenString) {
      return JSON.parse(tokenString)
    } else {
      return null
    }
  }

  const [token, setToken] = useState(getToken())

  function saveToken(username: string, token: string) {
    const tokenDetails: TokenDetails = {
      username,
      token,
    }

    localStorage.setItem('token', JSON.stringify(tokenDetails))
    setToken(tokenDetails)
  }

  return {
    setToken: saveToken,
    token,
  }
}

export function verifyToken(_tokenDetails: TokenDetails) {
  return true
}

export function login(_username: string, _password: string) {
  return ''
}
