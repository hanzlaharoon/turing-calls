import { User } from '@/types'
import { createContext, useContext, useEffect, useReducer } from 'react'

interface AuthState {
  status: 'loggedIn' | 'loggedOut'
  user: User
  accessToken: string
  refreshToken: string
}

const initialAuthState: AuthState = {
  status: 'loggedOut',
  user: {
    id: '',
    username: '',
  },
  accessToken: '',
  refreshToken: '',
}

interface LoginAction {
  type: 'Login'
  payload: Omit<AuthState, 'status'>
}

interface LogoutAction {
  type: 'Logout'
}

interface RefreshTokenAction {
  type: 'RefreshToken'
  payload: Omit<AuthState, 'status' | 'refreshToken'>
}

type AuthActions = LoginAction | LogoutAction | RefreshTokenAction

function authReducer(state: AuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case 'Login':
      return { ...state, status: 'loggedIn', ...action.payload }

    case 'Logout':
      return { ...initialAuthState }

    case 'RefreshToken':
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export const useAuth = () => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState)

  function login(payload: LoginAction['payload']) {
    const { user, accessToken, refreshToken } = payload
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    dispatch({ type: 'Login', payload })
  }

  function refreshToken(payload: RefreshTokenAction['payload']) {
    const { user, accessToken } = payload
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('accessToken', accessToken)
    dispatch({ type: 'RefreshToken', payload })
  }

  function logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    dispatch({ type: 'Logout' })
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (user && accessToken && refreshToken) {
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
