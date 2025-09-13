// Auth Store - État et logique métier pour l'authentification
import { createStore } from 'solid-js/store'

export interface User {
  id: string
  discordId: string
  username: string
  avatar?: string
  roles: string[]
  email?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
}

export const [authState, setAuthState] = createStore<AuthState>(initialState)

// Actions
export const authActions = {
  setLoading: (loading: boolean) => {
    setAuthState('isLoading', loading)
  },

  setUser: (user: User | null) => {
    setAuthState('user', user)
    setAuthState('isAuthenticated', !!user)
  },

  setError: (error: string | null) => {
    setAuthState('error', error)
  },

  login: async (discordCode: string) => {
    setAuthState('isLoading', true)
    setAuthState('error', null)

    try {
      const response = await fetch('/api/auth/discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: discordCode })
      })

      if (!response.ok) {
        throw new Error('Échec de la connexion')
      }

      const user = await response.json()
      setAuthState('user', user)
      setAuthState('isAuthenticated', true)
    } catch (error) {
      setAuthState('error', error instanceof Error ? error.message : 'Erreur inconnue')
    } finally {
      setAuthState('isLoading', false)
    }
  },

  logout: async () => {
    setAuthState('isLoading', true)

    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setAuthState('user', null)
      setAuthState('isAuthenticated', false)
    } catch (error) {
      setAuthState('error', error instanceof Error ? error.message : 'Erreur de déconnexion')
    } finally {
      setAuthState('isLoading', false)
    }
  },

  checkAuth: async () => {
    setAuthState('isLoading', true)

    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const user = await response.json()
        setAuthState('user', user)
        setAuthState('isAuthenticated', true)
      } else {
        setAuthState('user', null)
        setAuthState('isAuthenticated', false)
      }
    } catch (error) {
      setAuthState('error', error instanceof Error ? error.message : 'Erreur de vérification')
    } finally {
      setAuthState('isLoading', false)
    }
  }
}

// Getters
export const authGetters = {
  hasRole: (role: string) => {
    return authState.user?.roles.includes(role) ?? false
  },
  isComplainant: () => {
    return authGetters.hasRole('complainant')
  },

  isInspector: () => {
    return authGetters.hasRole('inspector')
  },
  isJudge: () => {
    return authGetters.hasRole('judge')
  },
}
