import { useState } from 'react'

export type TokenDetails = {
  username: string
  tokenDetails: string
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
  function getToken(): TokenDetails | null {
    const tokenDetailsString = localStorage.getItem(LOCAL_STORAGE_TOKEN_DETAILS)

    if (tokenDetailsString) {
      return JSON.parse(tokenDetailsString)
    } else {
      return null
    }
  }

  const [tokenDetails, setTokenDetails] = useState(getToken())

  function saveToken(username: string, token: string) {
    const tokenDetails: TokenDetails = {
      username,
      tokenDetails: token,
    }

    localStorage.setItem(
      LOCAL_STORAGE_TOKEN_DETAILS,
      JSON.stringify(tokenDetails)
    )
    setTokenDetails(tokenDetails)
  }

  function clearToken() {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_DETAILS)
  }

  return {
    setToken: saveToken,
    clearToken,
    tokenDetails,
  }
}

export async function loginProtectedPreload() {
  const authentication = useAuthentication()

  if (!authentication.tokenDetails) {
    return
  }

  const username64 = Buffer.from(authentication.tokenDetails.username).toString(
    'base64'
  )
  const token = authentication.tokenDetails.tokenDetails

  // Verify token validity
  await fetch('/php/verifyToken.php?username=' + username64 + '&token=' + token)
    .then((res) => res.json())
    .then((res: VerifyResponse) => {
      if (!res.valid) {
        authentication.clearToken()
      }
    })
    .catch((err) => console.log(err))
  // TODO: Should probably do something else apart from juts logging the error
}
