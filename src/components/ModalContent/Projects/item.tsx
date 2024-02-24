import ImageComponent from "@/components/ImageComponent"
import useStateContext from "@/hooks/useStateContext"
import { SanityProject } from "@/types/projects"
import { SanityTag } from "@/types/tags"
import { cn } from "@/utils/style"
import { CaretDown, CaretRight } from "@phosphor-icons/react"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import React, { useMemo } from "react"
import { urlForImage } from "../../../../sanity/lib/image"

interface ProjectItemProps {
  project: SanityProject
  skills: { [key: string]: SanityTag }
  expanded: boolean
  onExpand: () => void
}

function ProjectItem({ project, skills, expanded, onExpand }: ProjectItemProps) {
  const { setState } = useStateContext()

  const goToProject = () => {
    setState(`project:${project.title}`)
  }

  const formattedSkills = useMemo(() => {
    return project.tags.map(el => skills[el])
  }, [project, skills])

  return (
    <LayoutGroup id={project.title}>
      <AnimatePresence mode="popLayout">
        <motion.article
          layout
          layoutRoot
          initial={{ height: 88, scale: 0 }}
          animate={{ height: expanded ? 200 : 88, scale: 1 }}
          exit={{ height: 88, opacity: 0, scale: 0 }}
          key={project.title}
          className={cn(
            "grid prose prose-invert prose-headings:m-0 prose-p:m-0 relative pl-2 pr-4 py-3 gap-y-2 overflow-hidden",
            expanded
              ? "grid-areas-project-item-expanded grid-cols-project-item-expanded grid-rows-project-item-expanded"
              : "grid-areas-xs-project-item-shrunk xs:grid-areas-project-item-shrunk grid-cols-xs-project-item-shrunk xs:grid-cols-project-item-shrunk grid-rows-project-item-shrunk"
          )}
        >
          <motion.div layout key={project.title + 'container'} className="absolute inset-0 bg-slate-500 rounded-md -z-10" />

          <ImageComponent
            className="hidden xs:block grid-in-image mx-auto max-w-[min(15vw,200px)]"
            src={urlForImage(project.mainImage.image)}
            alt={project.mainImage.alt}
          />

          <motion.div layout key={project.title + 'title'} className="grid-in-title my-auto px-4">
            <h2
              className={cn('w-fit z-10 whitespace-nowrap', !expanded && 'cursor-pointer transition-colors hover:text-slate-300')}
              onClick={!expanded ? goToProject : undefined}
            >
              {project.title}
            </h2>

            {expanded && (
              <motion.div layout key={project.title + 'company'} layoutId="company">
                <h4>{project.company}</h4>
              </motion.div>
            )}
          </motion.div>

          {!expanded && (
            <motion.div layout key={project.title + 'company'} className="grid-in-company my-auto px-4" layoutId="company">
              <h4 className="line-clamp-1">{project.company}</h4>
            </motion.div>
          )}


          <motion.button
            layout
            key={project.title + 'button'}
            initial={{ rotate: expanded ? '0deg' : '180deg' }}
            animate={{ rotate: expanded ? '180deg' : '0deg' }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="grid-in-button"
            onClick={onExpand}
          >
            <CaretDown size={24} />
          </motion.button>

          {expanded && (
            <React.Fragment key={project.title + 'expanded'}>
              <motion.p
                layout
                key={project.title + 'description'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid-in-description px-4 line-clamp-2 leading-5"
              >
                {project.description}
              </motion.p>

              <motion.div
                layout key={project.title + 'skills'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid-in-skills relative flex"
              >

              </motion.div>

              <motion.button
                layout
                key={project.title + 'access'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid-in-access bg-red-600 hover:bg-red-500 transition-colors font-bold rounded-lg flex gap-3 items-center justify-center px-3"
                onClick={goToProject}
              >
                <p className="hidden md:block">Go to Project</p>
                <CaretRight />
              </motion.button>
            </React.Fragment>
          )}
        </motion.article>
      </AnimatePresence>
    </LayoutGroup>
  )
}

export default ProjectItem
