import { createSignal } from 'solid-js';
import { complaintsState, complaintsActions, complaintsGetters } from './complaints.store';
import type { ComplaintFormData, ComplaintSubmission } from './complaints.types';
import { getComplaintTemplate, type ComplaintTemplateType } from './complaints.template';
import type { OutputData } from '@editorjs/editorjs';

export const useComplaintForm = () => {
  const [formData, setFormData] = createSignal<ComplaintFormData>({
    content: { blocks: [] },
    captcha: ''
  });

  const updateContent = (content: OutputData) => {
    setFormData(prev => ({ ...prev, content }));
    complaintsActions.setCurrentComplaint({ ...formData(), content });
  };

  const updateCaptcha = (captcha: string) => {
    setFormData(prev => ({ ...prev, captcha }));
  };

  const resetForm = () => {
    setFormData({ content: { blocks: [] }, captcha: '' });
    complaintsActions.clearCurrentComplaint();
  };

  const loadTemplate = (templateType: ComplaintTemplateType) => {
    const template = getComplaintTemplate(templateType);
    return template;
  };

  return {
    formData,
    updateContent,
    updateCaptcha,
    resetForm,
    loadTemplate
  };
};


export const useComplaintSubmission = () => {
  const [submitted, setSubmitted] = createSignal(false);
  const [accessCode, setAccessCode] = createSignal<string>('');

  const submitComplaint = async (formData: ComplaintFormData): Promise<ComplaintSubmission | null> => {
    complaintsActions.setLoading(true);
    complaintsActions.setError(null);

    try {
      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la soumission');
      }

      const submission = await response.json();
      complaintsActions.setSubmission(submission);
      setSubmitted(true);
      setAccessCode(submission.accessCode);
      return submission;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      complaintsActions.setError(errorMessage);
      return null;
    } finally {
      complaintsActions.setLoading(false);
    }
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const data = complaintsState.currentComplaint;
    if (!data) return;
    await submitComplaint(data);
  };

  const resetSubmission = () => {
    setSubmitted(false);
    setAccessCode('');
    complaintsActions.clearSubmission();
  };

  return {
    submitComplaint,
    handleSubmit,
    resetSubmission,
    submitted,
    accessCode,
    isSubmitting: complaintsGetters.isSubmitting,
    error: () => complaintsState.error
  };
};