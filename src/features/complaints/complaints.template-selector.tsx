import { createSignal, For } from 'solid-js';
import { COMPLAINT_TEMPLATES, getComplaintTemplate, type ComplaintTemplateType } from './complaints.template';
import type { EditorData } from '~/features/editor';

interface TemplateSelectorProps {
  onTemplateSelect: (template: EditorData) => void;
  onCancel: () => void;
}

export const TemplateSelector = (props: TemplateSelectorProps) => {
  const [selectedTemplate, setSelectedTemplate] = createSignal<ComplaintTemplateType>(COMPLAINT_TEMPLATES.STANDARD);

  const templates = [
    {
      id: COMPLAINT_TEMPLATES.STANDARD,
      title: 'Signalement standard',
      description: 'Template complet pour un signalement détaillé avec toutes les sections nécessaires',
      icon: '📝'
    },
    {
      id: COMPLAINT_TEMPLATES.URGENT,
      title: 'Signalement urgent',
      description: 'Template simplifié pour les situations nécessitant une intervention immédiate',
      icon: '🚨'
    },
    {
      id: COMPLAINT_TEMPLATES.HARASSMENT,
      title: 'Signalement de harcèlement',
      description: 'Template spécialisé pour signaler des cas de harcèlement',
      icon: '🛡️'
    }
  ];

  const handleSelectTemplate = () => {
    props.onTemplateSelect(getComplaintTemplate(selectedTemplate()));
  };

  return (
    <div class="fixed inset-0 bg-[#00000080] flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-md  max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Choisissez un template pour votre signalement
          </h2>
          <p class="text-gray-600 mb-6">
            Sélectionnez le template qui correspond le mieux à votre situation.
            Vous pourrez modifier le contenu après avoir choisi le template.
          </p>

          <div class="space-y-4 mb-6">
            <For each={templates}>
              {(template) => (
                <div
                  data-is-selected={selectedTemplate() === template.id}
                  class={`p-4 border-2 rounded-md cursor-pointer transition-all data-[is-selected=true]:border-primary data-[is-selected=true]:bg-primary/10
                  data-[is-selected=false]:border-gray-200 data-[is-selected=false]:hover:border-gray-300`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div class="flex items-center space-x-3">
                    <div class="text-2xl">{template.icon}</div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-gray-900 mb-1 m-0">
                        {template.title}
                      </h3>
                      <p class="text-sm text-gray-600">
                        {template.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>

          <div class="flex justify-end gap-6">
            <button
              onClick={() => props.onCancel()}
              class="cursor-pointer"
            >
              Annuler
            </button>
            <button
              onClick={handleSelectTemplate}
              class="btn"
            >
              Utiliser ce template
            </button>
          </div>
        </div>
      </div >
    </div >
  );
};
