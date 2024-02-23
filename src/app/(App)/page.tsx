import Canvas from "@/components/Canvas";
import { About, Contact, Project, Projects } from "@/components/ModalContent";
import { SanityProject } from "@/types/projects";
import { PROJECT_PREDICATE } from "@/utils/constants";
import { client } from "../../../sanity/lib/client";
import { allProjects } from "../../../sanity/queries/projects";

async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const data = await client.fetch<SanityProject[]>(
    allProjects,
    // @ts-expect-error
    { next: { revalidate: 0 } }
  )

  const state = searchParams?.['m'] ?? 'home'

  return (
    <section className="w-full h-svh relative">
      {state === 'Contact Me' && <Contact />}
      {state === 'About' && <About />}
      {state === 'Projects' && <Projects projects={data} />}

      {
        typeof state === 'string'
        && state.startsWith(PROJECT_PREDICATE)
        && <Project state={state.split('project:').at(-1)!} />
      }

      <Canvas projectMarkers={data} />
    </section>
  )
}

export default Home
