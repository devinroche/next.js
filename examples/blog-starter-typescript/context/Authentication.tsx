import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import { useCookies } from 'react-cookie'

const VALID_AUTH_COOKIE = '1234567890'
const VALID_EMAIL = 'test@email.com'
const VALID_PASSWORD = 'foo'

interface AuthenticationContextType {
  // ideally we can store an object of type user here but since we are using an id in cookies, thats all we have.
  user: string | null
  loading: boolean
  login: (email: string, password: string) => void
}

interface AuthenticationProviderProps {
  children: React.ReactNode
}

export const AuthenticationContext = createContext<AuthenticationContextType>(
  {} as AuthenticationContextType
)

export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({
  children,
}) => {
  const [cookies, setCookie] = useCookies(['user'])
  const [user, setUser] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cookie = cookies.user
    if (cookie) {
      setUser(cookie)
    }
    setLoading(false)
  }, [cookies.user])

  const login = useCallback(
    (email: string, password: string) => {
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        setCookie('user', VALID_AUTH_COOKIE, { path: '/' })
        setUser(VALID_AUTH_COOKIE)
      }
    },
    [setCookie]
  )

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      login,
    }),
    [user, loading, login]
  )

  return (
    <AuthenticationContext.Provider value={memoedValue}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export const useAuthentication = () => React.useContext(AuthenticationContext)
