import { For, Show } from "solid-js";
import { Status } from "~/ui/Status/Status";
import { useComplaintDetails } from "./complaint-details.hook";
import { ActivityLog } from "../activity-log/activity-log";
import { useAuth } from "@solid-mediakit/auth/client";
import { ACTIVITY_LABELS, ACTOR_TYPE_LABELS, STATUS_LABELS } from "../activity-log/activity-log.constants";

export const ComplaintDetailsView = (props: { id: string }) => {
  const { complaintDetails, activityLogs, loading, fetchComplaintDetails } = useComplaintDetails(props.id);
  const { session } = useAuth();

  return (
    <div class="max-w-4xl mx-auto p-4 space-y-6">

      <Show when={loading()}>
        <div class="flex items-center justify-center">
          Chargement...
        </div>
      </Show>
      <Show when={complaintDetails() && !loading()}>
        <div class="flex flex-col gap-4">
          <div class="flex gap-2 items-center justify-center">
            <h1 class="text-center text-lg">Détails de la plainte {props.id}</h1>

            <div class="flex items-center justify-center gap-2">
              <Status status={complaintDetails()?.status || ''} />
            </div>
          </div>


          <div class="p-4 border border-gray-200 rounded-md w-full">
            <div class="text-right">{new Date(complaintDetails()?.createdAt || new Date()).toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</div>
            {/* eslint-disable-next-line solid/no-innerhtml */}
            <div class="prose max-w-none" innerHTML={complaintDetails()?.decryptedContent?.replace(/<script[^>]*>.*?<\/script>/gi, '')} />
          </div>
        </div>
      </Show>
      <Show when={activityLogs() && !loading()}>
        <div class="flex flex-col gap-4">
          <h2 class="text-lg text-center">Activités</h2>
          <For each={activityLogs()}>
            {(activityLog) => (
              <div class="border border-gray-200 rounded-md p-4 w-full mx-auto" id={activityLog.id}>
                <div class="flex justify-between items-center mb-2 text-sm text-gray-600">
                  <div class="flex items-center gap-2">
                    <span class="font-medium">{activityLog.actorName}</span>
                    <span>•</span>
                    <span class="text-blue-600 font-medium">
                      {ACTOR_TYPE_LABELS[activityLog.actorType as keyof typeof ACTOR_TYPE_LABELS] || activityLog.actorType}
                    </span>
                    <span>•</span>
                    <span class="text-green-600 font-medium">
                      {(() => {
                        // Extraire la valeur de l'action (format: "type:value" -> "value")
                        const actionValue = activityLog.action.includes(':') ? activityLog.action.split(':')[1] : activityLog.action;
                        return ACTIVITY_LABELS[actionValue as keyof typeof ACTIVITY_LABELS] ||
                          STATUS_LABELS[actionValue as keyof typeof STATUS_LABELS] ||
                          actionValue;
                      })()}
                    </span>
                  </div>
                  <span>{new Date(activityLog.createdAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
                {/* eslint-disable-next-line solid/no-innerhtml */}
                <div innerHTML={activityLog.decryptedContent} class="html w-full" />
              </div>
            )}
          </For>
        </div>
      </Show>

      <Show when={session()?.user?.roles?.some(role => role.name.match(/inspector|judge/i)) && complaintDetails() && !loading()}>
        <div class="flex flex-col gap-4">
          <h2 class="text-lg text-center">Ajouter une activité</h2>
          <ActivityLog callback={() => {
            fetchComplaintDetails();
          }} complaintId={props.id} />
        </div>
      </Show>
    </div>
  );
};