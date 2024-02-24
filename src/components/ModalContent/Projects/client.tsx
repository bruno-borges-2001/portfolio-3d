'use client'

import useStateContext from "@/hooks/useStateContext"
import { SanityProject } from "@/types/projects"
import { SanityTag } from "@/types/tags"
import { AnimatePresence } from "framer-motion"
import { useMemo, useState } from "react"
import ProjectItem from "./item"

export function RedirectToContactButton() {
  const { setState } = useStateContext()
  return <button onClick={() => setState('Contact Me')} className="underline hover:text-[#FAFAFA] font-normal">here</button>
}

export function ProjectList({ projects, skills }: { projects: SanityProject[], skills: SanityTag[] }) {
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

  const parsedSkills = useMemo(() => {
    return skills.reduce<{ [key: string]: SanityTag }>((prev, value) => {
      return { ...prev, [value.label]: value }
    }, {})
  }, [skills])

  const handleExpand = (index: number) => () => {
    setExpandedIndex(prev => prev === index ? -1 : index)
  }

  return (
    <section className="py-4 flex flex-col gap-3">
      <AnimatePresence mode="popLayout">
        {projects.map((project, i) =>
          <ProjectItem
            key={project.title + 'item'}
            project={project}
            skills={parsedSkills}
            expanded={expandedIndex === i}
            onExpand={handleExpand(i)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}