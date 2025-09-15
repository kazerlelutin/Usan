import { A } from "@solidjs/router"
import { Show, type JSX } from "solid-js"
import { clientEnv } from "~/env/client"
import { AuthProfile } from "~/features/auth/auth.profile"
import { useAuth } from "@solid-mediakit/auth/client"

type LayoutProps = {
  children: JSX.Element
}

export const Layout = (props: LayoutProps) => {
  const { session } = useAuth();

  return (
    <div class="grid grid-rows-[auto_1fr_auto] gap-2 h-[100dvh]">
      <header class="p-2 flex items-center justify-between gap-4">
        <A href="/" class="flex items-center  gap-2">
          <img src="/usan.svg" alt="Logo" class="w-8 h-8" title={`${clientEnv.VITE_ENTITY_NAME} - Usan`} />
          <p class="text-2xl font-bold m-0">{clientEnv.VITE_ENTITY_NAME}</p>
        </A>
        <AuthProfile />

      </header >
      {props.children}
      < footer class="flex justify-center gap-4 pb-4" >
        <A href="/">Accueil</A>
        <A href="/complaints">Suivi</A>
        <Show when={session()?.user?.roles?.some(role => role.name.match(/inspector|judge/i))}>
          <A href="/admin">administration</A>
        </Show>
      </footer >
    </div >
  )
}