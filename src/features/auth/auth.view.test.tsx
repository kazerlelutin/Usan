// Tests des composants d'authentification
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@solidjs/testing-library'
import { LoginButton, UserProfile, AuthGuard, AuthError, AuthLoading } from './auth.view'

// Mock des hooks
vi.mock('./auth.hook', () => ({
  useAuth: vi.fn(() => ({
    isAuthenticated: () => false,
    isLoading: () => false,
    error: () => null,
    user: () => null,
    login: vi.fn(),
    logout: vi.fn()
  })),
  useAuthConditional: vi.fn(() => ({
    showWhenAuthenticated: () => false,
    showWhenNotAuthenticated: () => true,
    showForRole: () => false,
    showForAdmin: () => false,
    showForBureau: () => false,
    showForMember: () => false
  }))
}))

describe('Auth Components', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('LoginButton', () => {
    it('should render login button when not authenticated', () => {
      render(() => <LoginButton />)
      expect(screen.getByText('Se connecter avec Discord')).toBeInTheDocument()
    })
  })

  describe('AuthError', () => {
    it('should not render error when no error', () => {
      render(() => <AuthError />)
      expect(screen.queryByText('Erreur d\'authentification')).not.toBeInTheDocument()
    })
  })

  describe('AuthLoading', () => {
    it('should not render loading when not loading', () => {
      render(() => <AuthLoading />)
      expect(screen.queryByText('Chargement...')).not.toBeInTheDocument()
    })
  })
})