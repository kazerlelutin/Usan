import { type VoidComponent } from "solid-js";
import { ComplaintsForm } from "~/features/complaints/complaints.form";

const Home: VoidComponent = () => {
  return (
    <main class="flex flex-col items-center justify-center bg-primary relative">
      <div class="absolute inset-0 overflow-y-auto flex flex-col items-center">
        <ComplaintsForm />
      </div>
    </main>
  );
};

export default Home;