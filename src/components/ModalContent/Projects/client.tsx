'use client'

import useStateContext from "@/hooks/useStateContext"
import { SanityProject } from "@/types/projects"
import { AnimatePresence } from "framer-motion"
import { useMemo, useState } from "react"
import ProjectItem from "./item"

export function RedirectToContactButton() {
  const { setState } = useStateContext()
  return <button onClick={() => setState('Contact Me')} className="underline hover:text-[#FAFAFA] font-normal">here</button>
}

export function ProjectList({ projects }: { projects: SanityProject[] }) {
  const [expandedIndex, setExpandedIndex] = useState(-1)

  const filterCategories = useMemo(() => {
    const companies = new Set<string>()
    const skills = new Set<string>()

    projects.forEach(el => {
      companies.add(el.company)
      el.tags.map(tag => skills.add(tag))
    })

    return { companies: Array.from(companies), skills: Array.from(skills) }
  }, [projects])

  const handleExpand = (index: number) => () => {
    //   if (expandedIndex === -1 || index === -1) {
    //     setExpandedIndex(index)
    //     return
    //   }

    setExpandedIndex(prev => prev === index ? -1 : index)

    // if (expandedIndex === index) return

    // setTimeout(() => setExpandedIndex(index), 300)
  }

  return (
    <section className="py-4 flex flex-col gap-3">
      <AnimatePresence mode="popLayout">
        {projects.map((project, i) =>
          <ProjectItem
            key={project.title + 'item'}
            project={project}
            expanded={expandedIndex === i}
            onExpand={handleExpand(i)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}