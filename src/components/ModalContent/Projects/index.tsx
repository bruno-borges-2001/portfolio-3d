import { SanityProject } from "@/types/projects"
import { SanityTag } from "@/types/tags"
import { client } from "../../../../sanity/lib/client"
import { allTags } from "../../../../sanity/queries/tags"
import ModalContainer from "../ModalContainer"
import { ProjectList, RedirectToContactButton } from "./client"

async function Projects({ projects }: { projects: SanityProject[] }) {
  const skills = await client.fetch<SanityTag[]>(allTags)

  return (
    <ModalContainer>
      <section className="prose prose-invert">
        <h1>Projects</h1>

        <h3>Here is a showcase of my best projects.</h3>
        <h4>If you like and want to help me light up this city, contact me <RedirectToContactButton />!</h4>
      </section>

      <ProjectList projects={projects} skills={skills} />
    </ModalContainer>
  )
}

export default Projects
