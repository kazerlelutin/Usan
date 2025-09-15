import { For, Show } from 'solid-js';
import { EditorView } from '~/features/editor';
import { useActivityLog } from "./activity-log.hook";
import { useAuth } from "@solid-mediakit/auth/client";
import { WORKFLOW_ACTIONS } from "./activity-log.constants";

export const ActivityLog = (props: { callback: () => void, complaintId: string }) => {
  const { setContent, setAction, action, handleSave, loading } = useActivityLog(props.callback, props.complaintId);

  const { session } = useAuth();


  const isJudge = () => session()?.user?.roles?.some(role => role.name.match(/judge/i));
  const isInspector = () => session()?.user?.roles?.some(role => role.name.match(/inspector/i));

  const availableActions = () => {
    if (isJudge()) {
      return WORKFLOW_ACTIONS.JUDGE;
    } else if (isInspector()) {
      return WORKFLOW_ACTIONS.INSPECTOR;
    }
    return [];
  };

  return (
    <div class="border border-gray-200 rounded-md p-4 w-full mx-auto space-y-4">
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium hidden">Type d'activité</label>
        <select
          class="select w-full"
          value={action() || ''}
          onChange={(e) => setAction(e.currentTarget.value)}
        >
          <option value="">Sélectionnez un type d'activité</option>
          <For each={availableActions()}>
            {(action) => (
              <option value={`${action.type}:${action.value}`}>{action.label}</option>
            )}
          </For>
        </select>
      </div>

      <Show when={action()}>
        <div class="flex flex-col gap-2">
          <div class="bg-blue-50 border border-blue-200 rounded-md p-3">
            <div class="flex items-start gap-2">
              <div class="text-blue-600 mt-0.5">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="text-sm text-blue-800">
                <p class="font-medium mb-1">Information importante</p>
                <p class="mb-0">Cette activité sera visible par le plaignant et ne pourra pas être modifiée ou supprimée après enregistrement.</p>
              </div>
            </div>
          </div>

          <label class="text-sm font-medium hidden">Détails</label>
          <EditorView
            config={{
              placeholder: `Décrivez votre ${action()?.split(':')[1] === 'status' ? 'changement de statut' : 'activité'} de manière détaillée...`,
              minHeight: 200,
              enableImages: true,
              enableHeaders: true,
              enableLists: true,
              enableLinks: true,
              enableMarker: true,
              enableQuote: true,
              enableCode: true,
              enableDelimiter: true,
              maxImageSize: 5
            }}
            callbacks={{
              onChange: (data) => {
                setContent(data);
              }
            }} />
        </div>

        <div class="flex justify-end">
          <button class="btn" onClick={() => handleSave()} disabled={loading()}>
            Enregistrer l'activité
          </button>
        </div>
      </Show >
    </div >
  );
};