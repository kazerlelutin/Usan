import { Pagination } from "~/ui/pagination/pagination";
import { Status } from "~/ui/Status/Status";
import { useComplaintsList } from "./complaints-list.hook";
import { For, Show } from "solid-js";

export const ComplaintsListView = () => {
  const { complaints, loading, error, total, fetchComplaints } = useComplaintsList();

  return (
    <div class="grid grid-rows-[1fr_auto] gap-4">
      <div class="relative h-full w-full">
        <div class="absolute top-0 left-0 w-full h-full">
          <Show when={loading()}>
            <div class="text-center flex  items-center justify-center">Chargement...</div>
          </Show>
          <Show when={error()}>
            <div class="text-center flex items-center justify-center">Erreur: {error()}</div>
          </Show>
          <Show when={complaints().length === 0 && !loading()}>
            <div class="text-center flex items-center justify-center">Aucun signalement trouvé</div>
          </Show>
          <Show when={complaints().length > 0}>
            <div class="flex flex-col gap-4 p-4">
              <For each={complaints()}>
                {(complaint) => (
                  <div class="grid grid-cols-3 gap-4 items-center">
                    <div class="text-left truncate">{complaint.id}</div>
                    <div class="text-center">{new Date(complaint.updatedAt).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</div>
                    <div class="text-right">
                      <Status status={complaint.status} class="justify-end" />
                    </div>
                  </div>
                )}
              </For>
            </div>
          </Show>
        </div>
      </div>
      <Pagination onChange={fetchComplaints} total={total()} />
    </div >
  );
};