import { SanityProject } from "@/types/projects"
import ModalContainer from "../ModalContainer"
import { ProjectList, RedirectToContactButton } from "./client"

function Projects({ projects }: { projects: SanityProject[] }) {
  return (
    <ModalContainer>
      <section className="prose prose-invert">
        <h1>Projects</h1>

        <h3>Here is a showcase of my best projects.</h3>
        <h4>If you like and want to help me light up this city, contact me <RedirectToContactButton />!</h4>
      </section>

      <ProjectList projects={projects} />
    </ModalContainer>
  )
}

export default Projects
