import ProjectList from "@/components/ProjectList";
import Cta from "@/components/Cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Development Projects",
  description:
    "Explore web development projects by Abhijeet Kumar, including business websites, Shopify stores, AI experiences, and full-stack applications.",
  alternates: { canonical: "/work" },
};

export default function Work() {
  return (<>
    <section className="min-h-[70svh] px-5 pb-10 pt-40 md:px-10">
      <h1 data-reveal className="mb-16 text-6xl font-semibold tracking-tighter md:text-9xl">Selected work</h1>
      <ProjectList />
    </section>
    <Cta />
  </>);
}
