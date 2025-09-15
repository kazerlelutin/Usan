import { createSignal, onMount } from "solid-js";
import type { FileTracking } from "./file-tracking.type";

export function useGetFileTracking(code: string) {

  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);
  const [data, setData] = createSignal<FileTracking | null>(null);
  const [notFound, setNotFound] = createSignal(false);

  const fetchFileTracking = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`/api/file-tracking/${code}`);
      const data = await response.json();

      if (response.status === 404) {
        setNotFound(true);
      } else {
        setData(data);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    fetchFileTracking();
  });

  return {
    data,
    error,
    loading,
    notFound,
  };
}