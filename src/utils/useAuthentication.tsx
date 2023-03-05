import React, { PropsWithChildren, useEffect } from 'react'
import { Button, CircularProgress } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import './useAuthentication.css'

export type TokenDetails = {
  username: string
  token: string
}

export type LoginResponse = {
  session_id: string
}

export type VerifyResponse = {
  valid: boolean
}

export type TokenControl = {
  setToken: (username: string, token: string) => void
  clearToken: () => void
  tokenDetails: TokenDetails | null
}

const LOCAL_STORAGE_TOKEN_DETAILS = 'tokenDetails'

export function useAuthentication(): TokenControl {
  const [cookies, setCookie, removeCookie] = useCookies([
    LOCAL_STORAGE_TOKEN_DETAILS,
  ])

  function getToken(): TokenDetails | null {
    const tokenDetails = cookies.tokenDetails

    if (tokenDetails) {
      return tokenDetails
    } else {
      return null
    }
  }

  const [tokenDetails, setTokenDetails] = useState(getToken())

  function saveToken(username: string, token: string) {
    const tokenDetails: TokenDetails = {
      username,
      token,
    }

    setCookie(LOCAL_STORAGE_TOKEN_DETAILS, tokenDetails, {
      path: '/',
      sameSite: 'strict',
      secure: true,
    })
    setTokenDetails(tokenDetails)
  }

  function clearToken() {
    removeCookie(LOCAL_STORAGE_TOKEN_DETAILS)
  }

  return {
    setToken: saveToken,
    clearToken,
    tokenDetails,
  }
}

export function LoginProtected(
  props: PropsWithChildren<{
    className?: string
  }>
) {
  const { children, className } = props
  // 0 - in progress
  // 1 - verified
  // 2 - error
  // 3 - unverified
  const [verified, setVerified] = useState(0)
  const authentication = useAuthentication()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authentication.tokenDetails) {
      navigate('/login')
      return
    }
    const token = authentication.tokenDetails.token

    // Verify token validity
    fetch('/php/verifyToken.php?token=' + token, { cache: 'no-store' })
      .then((res) => res.json())
      .then((res: VerifyResponse) => {
        if (!res.valid) {
          authentication.clearToken()
          setVerified(3)
        } else {
          setVerified(1)
        }
      })
      .catch((err) => {
        console.log(err)
        authentication.clearToken()
        setVerified(2)
      })
  }, [])

  function navigateToLoginPage() {
    navigate('/login')
  }

  switch (verified) {
    case 0:
      return (
        <div className='message-wrapper'>
          <CircularProgress />
        </div>
      )
    case 1:
      return <div className={className}>{children}</div>
    case 3:
      return (
        <div className='message-wrapper'>
          <p>Sesja wygasła</p>
          <Button onClick={navigateToLoginPage}>
            Wróć na stronę logowania
          </Button>
        </div>
      )
    default:
      return (
        <div className='message-wrapper'>
          <p>Coś się popsuło...</p>
          <Button onClick={navigateToLoginPage}>
            Wróć na stronę logowania
          </Button>
        </div>
      )
  }
}
