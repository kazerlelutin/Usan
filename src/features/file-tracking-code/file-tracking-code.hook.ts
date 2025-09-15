import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

export const useFileTrackingCode = () => {
  const navigate = useNavigate();
  const [code, setCode] = createSignal<string>('');

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    navigate(`/complaints/${code()}`);
    setCode('');
  };

  return {
    code,
    setCode,
    handleSubmit,
  };
};