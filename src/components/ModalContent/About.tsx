import { SanityTag } from "@/types/tags"
import { client } from "../../../sanity/lib/client"
import { allTags } from "../../../sanity/queries/tags"
import ImageComponent from "../ImageComponent"
import SkillCarousel from "../SkillCarousel"
import ModalContainer from "./ModalContainer"

async function About() {
  const tags = await client.fetch<SanityTag[]>(allTags)

  return (
    <ModalContainer>
      <section className="prose prose-invert">
        <h1>About Me</h1>

        <div className="flex flex-col md:flex-row-reverse justify-center relative md:justify-between items-start">
          <div className="md:w-[200px] sticky top-0 grid place-items-center">
            <div className="h-[200px] w-[200px] rounded-full overflow-hidden">
              <ImageComponent src="/assets/images/profile.jpeg" alt="me" />
            </div>

            <h4 className="text-center">Hey!!! My Name is Bruno. Nice to meet you!</h4>
          </div>

          <div className="basis-1/2 grow shrink min-w-[50%] md:max-w-[calc(100%-220px)]">
            <p>I am a software engineer focused on front end development and with a passion for creating intuitive and engaging user experiences. My expertise lies in using React JS and React Native, as well as other front-end frameworks, like Vue JS and Next, and technologies such as Tailwind CSS, HTML, and CSS. I am always eager to learn and keep up with the latest trends and technologies in front-end development.</p>
            <p>I am graduated from the Federal University of Santa Catarina (UFSC) with a B.S. in Computer Science.</p>
            <SkillCarousel skills={tags} />
          </div>
        </div>


      </section>
    </ModalContainer>
  )
}

export default About
