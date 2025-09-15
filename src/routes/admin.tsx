import { useAuth } from "@solid-mediakit/auth/client";
import { Show } from "solid-js";
import { ComplaintsListView } from "~/features/complaints-list/complaints-list.view";

const Admin = () => {
  const { session } = useAuth();

  return (
    <>
      <Show when={session()?.user?.roles?.some(role => role.name.match(/inspector|judge/i))}>
        <div class="grid grid-rows-[auto_1fr]">
          <h1 class="text-center">Suivi des signalements</h1>
          <ComplaintsListView />

        </div>
      </Show>
      <Show when={!session()?.user?.roles?.some(role => role.name.match(/inspector|judge/i))}>
        <div class="text-center flex h-full items-center justify-center"> Vous n'avez pas les permissions pour accéder à cette page</div>
      </Show >
    </>
  )
}

export default Admin