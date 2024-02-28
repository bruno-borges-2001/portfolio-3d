import { client } from "../../../sanity/lib/client"
import { getTagsFromIds } from "../../../sanity/queries/tags"
import SkillCarousel from "../SkillCarousel"

async function SkillCarouselComponent({ value }: { value: { skills: { _ref: string }[] } }) {
  const ids = value.skills.map(el => `"${el._ref}"`)
  const tags = await client.fetch(getTagsFromIds(ids))
  return <SkillCarousel skills={tags} startsExpanded />
}

export default SkillCarouselComponent
