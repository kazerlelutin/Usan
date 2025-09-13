import { type VoidComponent } from "solid-js";

const Home: VoidComponent = () => {
  return (
    <main class="flex flex-col items-center justify-center bg-primary">
      <div class="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 class="text-5xl font-extrabold tracking-tight text-primary sm:text-[5rem]">
          Umbrella
        </h1>
      </div>
    </main>
  );
};

export default Home;