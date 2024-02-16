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
      <section className="select-text prose prose-invert prose-h1:mb-1 prose-h4:mt-1 prose-h4:font-thin prose-h4:mb-4 h-[250px] flex justify-between relative">
        <div>
          <h1>{data.title}</h1>
          <h4 className="line-clamp-2">{data.description}</h4>

          <div className="flex gap-3 flex-wrap">
            {data.links.map((el, i) => <LinkPill {...el} key={i} />)}
          </div>
        </div>

        <div className="w-[100px] relative">
          <ImageComponent
            src={mainImage}
            alt={data.mainImage.alt}
            width={0}
            height={0}
            sizes="100vw"
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
