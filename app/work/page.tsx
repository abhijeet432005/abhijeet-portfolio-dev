import ProjectList from "@/components/ProjectList";
import Cta from "@/components/Cta";

export default function Work() {
  return (<>
    <section className="min-h-[70svh] px-5 pb-10 pt-40 md:px-10">
      <h1 data-reveal className="mb-16 text-6xl font-semibold tracking-tighter md:text-9xl">Selected work</h1>
      <ProjectList />
    </section>
    <Cta />
  </>);
}
