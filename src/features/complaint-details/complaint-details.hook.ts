import { createSignal, onMount } from "solid-js";

export const useComplaintDetails = (id: string) => {
  const [complaintDetails, setComplaintDetails] = createSignal<{
    decryptedContent: string;
    id: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;

  } | null>(null);
  const [activityLogs, setActivityLogs] = createSignal<{
    decryptedContent: string;
    id: string;
    action: string;
    actorType: string;
    actorId: string;
    actorName: string;
    createdAt: Date;
  }[] | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  const fetchComplaintDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/complaints/${id}`);
      const data = await response.json();

      if (response.status === 404) {
        throw new Error('Plainte non trouvée');
      }

      if (response.status === 401) {
        throw new Error('Unauthorized');
      }

      setComplaintDetails(data.complaint);
      setActivityLogs(data.activityLogs);

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    fetchComplaintDetails();
  });

  return {
    error,
    loading,
    activityLogs,
    complaintDetails,
    fetchComplaintDetails,
  };
};