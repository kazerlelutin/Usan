import { Show, Suspense, For } from "solid-js";
import { useGetFileTracking } from "./file-tracking.hook";
import { ACTIVITY_LABELS, ACTOR_TYPE_LABELS, STATUS_LABELS } from "../activity-log/activity-log.constants";

const STATUS_COLORS = {
  submitted: 'bg-green-500',
  under_investigation: 'bg-yellow-500',
  awaiting_judgment: 'bg-blue-500',
  closed: 'bg-gray-500'
} as const;


export const FileTrackingView = (props: { code: string }) => {

  const { loading, error, data, notFound } = useGetFileTracking(props.code);

  const activities = () => data()?.activities || [];
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

          {/* Timeline des activités */}
          <Show when={activities().length > 0}>
            <div class="mt-6 mx-auto max-w-[800px]">
              <h2 class="text-xl font-semibold mb-4 text-center">Historique des étapes</h2>
              <div class="space-y-4">
                <For each={activities()}>
                  {(activity) => (
                    <div class="border border-gray-200 rounded-md p-4 w-full">
                      <div class="flex justify-between items-center mb-2 text-sm text-gray-600">
                        <div class="flex items-center gap-2">
                          <span class="font-medium">{activity.actorName}</span>
                          <span>•</span>
                          <span class="text-blue-600 font-medium">
                            {ACTOR_TYPE_LABELS[activity.actorType as keyof typeof ACTOR_TYPE_LABELS] || activity.actorType}
                          </span>
                          <span>•</span>
                          <span class="text-green-600 font-medium">
                            {(() => {
                              // Extraire la valeur de l'action (format: "type:value" -> "value")
                              const actionValue = activity.action.includes(':') ? activity.action.split(':')[1] : activity.action;
                              return ACTIVITY_LABELS[actionValue as keyof typeof ACTIVITY_LABELS] ||
                                STATUS_LABELS[actionValue as keyof typeof STATUS_LABELS] ||
                                actionValue;
                            })()}
                          </span>
                        </div>
                        <span>{new Date(activity.createdAt).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>
                      {/* eslint-disable-next-line solid/no-innerhtml */}
                      <div innerHTML={activity.decryptedContent} class="html w-full" />
                    </div>
                  )}
                </For>
              </div>
            </div>
          </Show>
        </Show>
        <Show when={!loading() && !error() && !data()}>
          <div class="text-center flex h-full items-center justify-center">Aucune donnée trouvée</div>
        </Show>
      </Suspense>
    </div>
  );
};