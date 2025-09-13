// Auth View - Composants UI pour l'authentification
import { Component, Show } from 'solid-js'
import { useAuth, useAuthConditional } from './auth.hook'

// Composant de connexion Discord
export const LoginButton: Component = () => {
  const auth = useAuth()

  const handleDiscordLogin = () => {
    // Rediriger vers Discord OAuth
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${import.meta.env.VITE_DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin + '/api/auth/callback/discord')}&response_type=code&scope=identify%20email`
    window.location.href = discordAuthUrl
  }

  return (
    <Show when={!auth.isAuthenticated()}>
      <button
        onClick={handleDiscordLogin}
        disabled={auth.isLoading()}
        class="bg-discord hover:bg-discord-hover text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
      >
        {auth.isLoading() ? 'Connexion...' : 'Se connecter avec Discord'}
      </button>
    </Show>
  )
}

// Composant de profil utilisateur
export const UserProfile: Component = () => {
  const auth = useAuth()
  const conditional = useAuthConditional()

  return (
    <Show when={conditional.showWhenAuthenticated()}>
      <div class="flex items-center space-x-3">
        <Show when={auth.user()?.avatar}>
          <img
            src={auth.user()?.avatar}
            alt="Avatar"
            class="w-8 h-8 rounded-full"
          />
        </Show>
        <div>
          <p class="text-sm font-medium text-text">
            {auth.user()?.username}
          </p>
          <p class="text-xs text-gray-500">
            {auth.user()?.roles.join(', ')}
          </p>
        </div>
        <button
          onClick={auth.logout}
          class="text-sm text-secondary hover:text-accent"
        >
          Déconnexion
        </button>
      </div>
    </Show>
  )
}

// Composant de protection de contenu
export const AuthGuard: Component<{
  role?: string
  fallback?: Component
  children: any
}> = (props) => {
  const conditional = useAuthConditional()

  const canShow = () => {
    if (!conditional.showWhenAuthenticated()) return false
    if (props.role && !conditional.showForRole(props.role)) return false
    return true
  }

  return (
    <Show when={canShow()} fallback={props.fallback}>
      {props.children}
    </Show>
  )
}

// Composant d'affichage des erreurs
export const AuthError: Component = () => {
  const auth = useAuth()

  return (
    <Show when={auth.error()}>
      <div class="bg-error text-white p-4 rounded-lg">
        <p class="font-medium">Erreur d'authentification</p>
        <p class="text-sm">{auth.error()}</p>
      </div>
    </Show>
  )
}

// Composant de chargement
export const AuthLoading: Component = () => {
  const auth = useAuth()

  return (
    <Show when={auth.isLoading()}>
      <div class="flex items-center justify-center p-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span class="ml-2 text-text">Chargement...</span>
      </div>
    </Show>
  )
}
