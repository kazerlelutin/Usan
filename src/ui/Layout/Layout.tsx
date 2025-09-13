import { A } from "@solidjs/router"
import { type JSX } from "solid-js"
import { AuthProfile } from "~/features/auth/auth.profile"

type LayoutProps = {
  children: JSX.Element
}

export const Layout = (props: LayoutProps) => {
  return (
    <div class="grid grid-rows-[auto_1fr_auto] gap-2 h-[100dvh]">
      <header class="p-2">
        <AuthProfile />
      </header>
      {props.children}
      <footer class="flex justify-center gap-4 pb-4">

        <A href="/">Accueil</A>
        <A href="/admin">administration</A>
      </footer>
    </div >
  )
}