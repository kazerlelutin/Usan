import { useAuth } from "@solid-mediakit/auth/client";
import { useParams } from "@solidjs/router";
import { Show } from "solid-js";
import { ComplaintDetailsView } from "~/features/complaint-details/complaint-details.view";

const AdminId = () => {
  const { id } = useParams();
  const { session } = useAuth();

  return (
    <>
      <Show when={session()?.user?.roles?.some(role => role.name.match(/inspector|judge/i))}>
        <ComplaintDetailsView id={id} />
      </Show>
      <Show when={!session()?.user?.roles?.some(role => role.name.match(/inspector|judge/i))}>  <div class="text-center flex h-full items-center justify-center"> Vous n'avez pas les permissions pour accéder à cette page</div></Show>
    </>

  );
};

export default AdminId;