import { createSignal } from "solid-js";
import type { EditorData } from "../editor";

export const useActivityLog = (callback: () => void, complaintId: string) => {
  const [content, setContent] = createSignal<EditorData | null>(null);
  const [action, setAction] = createSignal<string | null>(null);
  const [loading, setLoading] = createSignal(false);

  const handleSave = async () => {
    setLoading(true);

    try {
      await fetch('/api/activity-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content(),
          action: action(),
          complaintId: complaintId,
        }),
      });
      callback();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }


  return {
    content,
    setContent,
    handleSave,
    loading,
    action,
    setAction,
  };
};