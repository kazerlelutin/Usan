import { Match, Switch } from "solid-js"
import { AuthSignin } from "./auth.signin"
import { AuthSignout } from "./auth.signout"
import { useAuth } from "@solid-mediakit/auth/client"

export const AuthProfile = () => {

  const auth = useAuth()


  return (
    <Switch>
      <Match when={auth.status() === "unauthenticated"}>
        <AuthSignin />
      </Match>
      <Match when={auth.status() === "authenticated"}>

        <div class="flex items-center justify-between gap-2">
          <div>
            <div class="flex items-center gap-2">
              <img src={auth.session()?.user?.image || ""} alt="Avatar" class="w-8 h-8 rounded-full" />
              <p>{auth.session()?.user?.name}</p>
            </div>
          </div>
          <AuthSignout />
        </div>
      </Match>
    </Switch>)

}