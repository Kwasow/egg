import React, { PropsWithChildren, useEffect } from 'react'
import { Button, CircularProgress } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import './useAuthentication.css'
import { phpPrefix } from '../components/Shared'

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

export type LoginPhpBody = {
  username: string
  password: string
}

export type VerifyPhpBody = {
  token: string
}

export type LogoutPhpBody = {
  token: string
}

export type OnLogin = {
  before?: () => void
  onError?: () => void
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

export function LoginButton(props: {
  className?: string
  username: string
  password: string
  onLogin?: OnLogin
}) {
  const { className, username, password, onLogin } = props
  const authentication = useAuthentication()
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const navigate = useNavigate()

  async function submit() {
    onLogin?.before?.apply({})
    setIsAuthenticating(true)

    const body: LoginPhpBody = {
      username,
      password,
    }

    await fetch(phpPrefix + 'authentication/login.php', {
      method: 'POST',
      body: JSON.stringify(body),
      cache: 'no-store',
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Server responded: ' + res.status)
        }
      })
      .then((res: LoginResponse) => {
        if (res.session_id.length > 0) {
          authentication.setToken(username, res.session_id)
          navigate('/admin')
        }
      })
      .catch((err) => console.error(err))

    // Login failed if we reached this point
    setIsAuthenticating(false)
    onLogin?.onError?.apply({})
  }

  useEffect(() => {
    function enterDownHandler(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        event.preventDefault()

        submit()
      }
    }

    document.addEventListener('keydown', enterDownHandler)
  }, [])

  return (
    <Button
      className={className}
      type='submit'
      onClick={submit}
      disabled={isAuthenticating}
    >
      Zaloguj
    </Button>
  )
}

export function LogoutButton(props: {
  className?: string
  onError?: () => void
}) {
  const { className, onError } = props
  const authentication = useAuthentication()
  const [logoutInProgress, setLogoutInProgress] = useState(false)
  const navigate = useNavigate()

  async function logout() {
    setLogoutInProgress(true)

    const body: LogoutPhpBody = {
      token: authentication.tokenDetails?.token || '',
    }

    await fetch(phpPrefix + 'authentication/logout.php', {
      method: 'POST',
      body: JSON.stringify(body),
      cache: 'no-store',
    })
      .then((res) => {
        if (res.ok) {
          authentication.clearToken()
          console.log('here')
          navigate('/login')
        } else {
          throw new Error('Server responded: ' + res.status)
        }
      })
      .catch((err) => console.error(err))

    // Logout failed if we reached this point
    setLogoutInProgress(false)
    onError?.apply({})
  }

  return (
    <Button
      className={className}
      type='submit'
      onClick={logout}
      disabled={logoutInProgress}
    >
      Wyloguj
    </Button>
  )
}

export function LoginProtected(
  props: PropsWithChildren<{
    className?: string
  }>,
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

    const body: VerifyPhpBody = {
      token: authentication.tokenDetails.token,
    }

    // Verify token validity
    fetch(phpPrefix + 'authentication/verifyToken.php', {
      method: 'POST',
      body: JSON.stringify(body),
      cache: 'no-store',
    })
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
