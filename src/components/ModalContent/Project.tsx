import { DetailedProject } from "@/types/projects"
import { client } from "../../../sanity/lib/client"
import { urlForImage } from "../../../sanity/lib/image"
import { project } from "../../../sanity/queries/projects"
import ImageComponent from "../ImageComponent"
import LinkPill from "../LinkPill"
import RichTextRenderer from '../RichTextRenderer'
import SkillCarousel from "../SkillCarousel"
import ModalContainer from "./ModalContainer"

async function Project({ state }: { state: string }) {
  const data = await client.fetch<DetailedProject>(project(state))

  const mainImage = urlForImage(data.mainImage.image)

  return (
    <ModalContainer>
      <section className="select-text prose prose-invert max-h-[200px] flex justify-between relative gap-10 mb-4">
        <div>
          <h1 className="mb-1">{data.title}</h1>
          <h4 className="line-clamp-2 mt-1 mb-4">{data.description}</h4>

          <div className="flex gap-3 flex-wrap">
            {data.links.map((el, i) => <LinkPill {...el} key={i} />)}
          </div>
        </div>

        <div className="w-[100px] relative grow flex items-center justify-end">
          <ImageComponent
            src={mainImage}
            alt={data.mainImage.alt}
            style={{ height: '100%', width: '100%', maxHeight: 250 }}
          />
        </div>
      </section>

      <SkillCarousel skills={data.tags} />

      <RichTextRenderer value={data.body} />
    </ModalContainer>
  )
}

export default Project
