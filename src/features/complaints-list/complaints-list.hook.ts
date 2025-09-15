import { createSignal } from "solid-js";
import type { Complaint } from "~/database/schema";

export const useComplaintsList = () => {
  const [complaints, setComplaints] = createSignal<Complaint[]>([]);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);
  const [total, setTotal] = createSignal(0);

  const fetchComplaints = async (page: number = 1, limit: number = 50) => {
    setComplaints([]);

    setLoading(true);
    setError(null);

    const searchParams = new URLSearchParams();
    searchParams.set('page', page.toString());
    searchParams.set('limit', limit.toString());
    const url = `/api/complaints?${searchParams.toString()}`;

    try {
      const response = await fetch(url);
      const resJson = await response.json();
      setComplaints(resJson.data);
      setTotal(resJson.total);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return {
    complaints,
    loading,
    error,
    total,
    fetchComplaints
  };
};