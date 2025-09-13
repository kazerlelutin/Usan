// Store pour la gestion des plaintes
import { createStore } from 'solid-js/store';
import type { ComplaintFormData, ComplaintSubmission } from './complaints.types';

export interface ComplaintsState {
  currentComplaint: ComplaintFormData | null;
  submission: ComplaintSubmission | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ComplaintsState = {
  currentComplaint: null,
  submission: null,
  isLoading: false,
  error: null
};

export const [complaintsState, setComplaintsState] = createStore<ComplaintsState>(initialState);

export const complaintsActions = {
  setCurrentComplaint: (complaint: ComplaintFormData) => {
    setComplaintsState('currentComplaint', complaint);
  },

  setLoading: (loading: boolean) => {
    setComplaintsState('isLoading', loading);
  },

  setError: (error: string | null) => {
    setComplaintsState('error', error);
  },

  setSubmission: (submission: ComplaintSubmission) => {
    setComplaintsState('submission', submission);
  },

  clearCurrentComplaint: () => {
    setComplaintsState('currentComplaint', null);
  },

  clearSubmission: () => {
    setComplaintsState('submission', null);
  },

  reset: () => {
    setComplaintsState(initialState);
  }
};

// Getters
export const complaintsGetters = {
  hasCurrentComplaint: () => {
    return !!complaintsState.currentComplaint;
  },

  hasSubmission: () => {
    return !!complaintsState.submission;
  },
  isSubmitting: () => {
    return complaintsState.isLoading;
  },

  hasError: () => {
    return !!complaintsState.error;
  }
};
