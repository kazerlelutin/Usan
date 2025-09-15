import { useFileTrackingCode } from "./file-tracking-code.hook";
import { useNavigate } from "@solidjs/router";

export const FileTrackingCode = () => {
  const navigate = useNavigate();
  const { code, setCode, handleSubmit } = useFileTrackingCode();

  return (
    <form class="flex flex-col justify-center h-full gap-4" onSubmit={handleSubmit}>
      <h1>Entrez le code de suivi</h1>
      <input type="text" class="border border-gray-300 rounded-md p-2" value={code()} onChange={(e) => setCode(e.target.value)} />
      <div class="flex items-center justify-between gap-4">
        <button class="cursor-pointer" onClick={() => navigate('/')}>return</button>
        <button class="btn" type="submit">Suivre</button>
      </div>
    </form>
  );
};