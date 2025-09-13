// Auth Hook - Interface SolidJS pour l'authentification
import { createEffect, onMount } from 'solid-js'
import { authState, authActions, authGetters } from './auth.store'

export const useAuth = () => {
  // Vérifier l'authentification au montage
  onMount(() => {
    authActions.checkAuth()
  })

  return {
    // État
    user: () => authState.user,
    isAuthenticated: () => authState.isAuthenticated,
    isLoading: () => authState.isLoading,
    error: () => authState.error,

    // Actions
    login: authActions.login,
    logout: authActions.logout,
    checkAuth: authActions.checkAuth,

    // Getters
    hasRole: authGetters.hasRole,
    isInspector: authGetters.isInspector,
    isComplainant: authGetters.isComplainant,
    isJudge: authGetters.isJudge,
  }
}

export const useAuthGuard = (requiredRole?: string) => {
  const auth = useAuth()

  createEffect(() => {
    if (!auth.isAuthenticated()) {
      // Rediriger vers login
      window.location.href = '/login'
      return
    }

    if (requiredRole && !auth.hasRole(requiredRole)) {
      // Rediriger vers accès refusé
      window.location.href = '/unauthorized'
      return
    }
  })

  return auth
}

export const useAuthConditional = () => {
  const auth = useAuth()

  return {
    showForRole: (role: string) => auth.hasRole(role),
    showForInspector: () => auth.isInspector(),
    showForJudge: () => auth.isJudge(),
    showForComplainant: () => auth.isComplainant(),
    showWhenAuthenticated: () => auth.isAuthenticated(),
    showWhenNotAuthenticated: () => !auth.isAuthenticated()
  }
}
