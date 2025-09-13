import { Show, createSignal } from 'solid-js';
import { useComplaintForm, useComplaintSubmission } from './complaints.hook';
import { EditorView } from '~/features/editor';
import { TemplateSelector } from './complaints.template-selector';
import type { EditorData } from '~/features/editor';
import { A } from '@solidjs/router';

export const ComplaintsForm = () => {
  const { updateContent, resetForm } = useComplaintForm();
  const { isSubmitting, error, submitted, accessCode, handleSubmit, resetSubmission } = useComplaintSubmission();

  const [showTemplateSelector, setShowTemplateSelector] = createSignal(false);
  const [editorTemplate, setEditorTemplate] = createSignal<EditorData | null>(null);

  return (
    <form onSubmit={handleSubmit} class="w-full mx-auto max-w-4xl md:p-6 p-4">
      <Show when={!submitted()}>
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
          <h2 class="text-xl font-bold text-gray-900">
            Faire un signalement
          </h2>
          <button
            type="button"
            onClick={() => setShowTemplateSelector(true)}
            class="btn"
          >
            Utiliser un template
          </button>
        </div>

        <EditorView
          config={{
            placeholder: 'Décrivez votre signalement de manière détaillée...',
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
            onChange: (content) => updateContent(content)
          }}
          initialData={editorTemplate()}
        />

        <Show when={error()}>
          <div class="bg-red-50 border border-red-200 rounded-md p-4">
            <p class="text-red-800">{error()}</p>
          </div>
        </Show>

        <div class="flex justify-end items-center">
          <button
            type="submit"
            disabled={isSubmitting()}
            class="btn disabled:text-black disabled:border-black text-green-800 border-green-800"
          >
            {isSubmitting() ? 'Envoi en cours...' : 'Soumettre le signalement'}
          </button>
        </div>

      </Show >

      <Show when={submitted()}>
        <div class=" text-center flex flex-col items-center gap-4">
          <div class="text-green-800 text-6xl mb-4">✓</div>
          <h3 class="text-xl font-bold text-green-800 mb-2">
            Signalement soumis avec succès
          </h3>
          <p class="text-green-800 mb-4">
            Votre signalement a été enregistré et sera traité par nos équipes.
          </p>
          <div class="bg-white border border-green-800 rounded-md p-4 mb-4">
            <p class="text-sm text-gray-600 mb-2">Votre code de suivi :</p>
            <p class="text-2xl font-mono font-bold text-primary">{accessCode()}</p>
          </div>
          <p class="text-sm text-gray-600 text-center">
            Conservez précieusement ce code. Il vous permettra de suivre l'avancement de votre signalement.
          </p>


          <div class="flex justify-between items-center gap-4">
            <A href={`/complaints/${accessCode()}`} class="btn">Suivre le signalement</A>
            <button
              onClick={() => {
                resetSubmission();
                resetForm();
                setEditorTemplate(null);
              }}
              class="btn"
            >
              Faire un nouveau signalement
            </button>
          </div>
        </div>
      </Show>

      <Show when={showTemplateSelector()}>
        <TemplateSelector
          onTemplateSelect={(template) => {
            setEditorTemplate(template);
            setShowTemplateSelector(false);
          }}
          onCancel={() => setShowTemplateSelector(false)}
        />
      </Show>
    </form>
  );
};