import type { VoidComponent } from "solid-js";
import { FileTrackingCode } from "~/features/file-tracking-code/file-tracking-code.view";

const Complaints: VoidComponent = () => {
  return (
    <div class="flex flex-col items-center justify-center h-full">

      <FileTrackingCode />
    </div>
  );
};

export default Complaints;