import { Show, Suspense } from "solid-js";
import { useGetFileTracking } from "./file-tracking.hook";

const STATUS_LABELS = {
  submitted: 'Soumis',
  under_investigation: 'En cours d\'enquête',
  awaiting_judgment: 'En attente de jugement',
  closed: 'Fermé'
} as const;

const STATUS_COLORS = {
  submitted: 'bg-green-500',
  under_investigation: 'bg-yellow-500',
  awaiting_judgment: 'bg-blue-500',
  closed: 'bg-gray-500'
} as const;


export const FileTrackingView = (props: { code: string }) => {

  const { loading, error, data, notFound } = useGetFileTracking(props.code);
  return (
    <div class="w-full h-full p-4">
      <Suspense fallback={<div class="text-center flex h-full items-center justify-center">Chargement...</div>}>
        <Show when={notFound()}>
          <div class="text-center flex h-full items-center justify-center font-bold">Signalement non trouvé</div>
        </Show>
        <Show when={loading()}>
          <div class="text-center flex h-full items-center justify-center">Chargement...</div>
        </Show>
        <Show when={error()}>
          <div class="text-center flex h-full items-center justify-center">Erreur: {error()}</div>
        </Show>
        <Show when={data()}>
          <div class="flex items-center justify-center gap-4 mb-4">
            <h1 class="text-2xl font-bold text-gray-900 m-0 text-center " >
              Signalement {props.code}
            </h1>
            <div class="flex items-center gap-2 text-sm">
              <div class="h-full flex items-center mt-1">
                <span class={`w-2 h-2 rounded-full ${STATUS_COLORS[data()?.status as keyof typeof STATUS_COLORS] || 'bg-gray-500'}`} />
              </div>
              {STATUS_LABELS[data()?.status as keyof typeof STATUS_LABELS] || data()?.status}
            </div>
          </div>

          {/* eslint-disable-next-line solid/no-innerhtml */}
          <div innerHTML={data()?.content} class="html p-4 border border-gray-200 rounded-md" />
        </Show>
        <Show when={!loading() && !error() && !data()}>
          <div class="text-center flex h-full items-center justify-center">Aucune donnée trouvée</div>
        </Show>
      </Suspense>
    </div>
  );
};