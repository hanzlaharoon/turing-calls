import { LoginResponse } from '@/queries'
import { User } from '@/types'
import { createContext, useContext, useEffect, useReducer } from 'react'

interface AuthState {
  status: 'loggedIn' | 'loggedOut'
  user: User
  accessToken: string
  refreshToken: string
  tokenCreatedAt: string
}

const initialAuthState: AuthState = {
  status: 'loggedOut',
  user: {
    id: '',
    username: '',
  },
  accessToken: '',
  refreshToken: '',
  tokenCreatedAt: '',
}

interface LoginAction {
  type: 'Login'
  payload: LoginResponse & Pick<AuthState, 'tokenCreatedAt'>
}

interface LogoutAction {
  type: 'Logout'
}

interface RefreshTokenAction {
  type: 'RefreshToken'
  payload: Omit<LoginAction['payload'], 'refreshToken'>
}

type AuthActions = LoginAction | LogoutAction | RefreshTokenAction

function authReducer(state: AuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case 'Login':
      return {
        ...state,
        ...action.payload,
        status: 'loggedIn',
      }

    case 'Logout':
      return { ...initialAuthState }

    case 'RefreshToken':
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}

export const useAuth = () => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState)

  function login(payload: Omit<LoginAction['payload'], 'tokenCreatedAt'>) {
    const { user, accessToken, refreshToken } = payload
    const tokenCreatedAt = Date.now().toString()
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('tokenCreatedAt', tokenCreatedAt)
    dispatch({ type: 'Login', payload: { ...payload, tokenCreatedAt } })
  }

  function refreshToken(
    payload: Omit<RefreshTokenAction['payload'], 'tokenCreatedAt'>
  ) {
    const { user, accessToken } = payload
    const tokenCreatedAt = Date.now().toString()
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('tokenCreatedAt', tokenCreatedAt)
    dispatch({ type: 'RefreshToken', payload: { ...payload, tokenCreatedAt } })
  }

  function logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('tokenCreatedAt')
    dispatch({ type: 'Logout' })
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const tokenCreatedAt = localStorage.getItem('tokenCreatedAt')

    if (user && accessToken && refreshToken && tokenCreatedAt) {
      const parsedUser = JSON.parse(user)

      login({ user: parsedUser, accessToken, refreshToken })
    }
  }, [])

  return {
    state,
    actions: {
      login,
      logout,
      refreshToken,
    },
  }
}

const AuthContext = createContext<ReturnType<typeof useAuth>>({
  state: initialAuthState,
  actions: {
    login: () => {},
    logout: () => {},
    refreshToken: () => {},
  },
})

export const AuthProvider = AuthContext.Provider

export const useAuthContext = () => useContext(AuthContext)
