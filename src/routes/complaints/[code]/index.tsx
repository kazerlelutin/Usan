import type { VoidComponent } from "solid-js";
import { useParams } from "@solidjs/router";
import { FileTrackingView } from "~/features/file-tracking/file-tracking.view";

const ComplaintsCode: VoidComponent = () => {
  const { code } = useParams();
  return (
    <FileTrackingView code={code} />
  );
};

export default ComplaintsCode;