import { type SchemaTypeDefinition } from 'sanity'
import asset from './schemas/atoms/asset'
import company from './schemas/atoms/company'
import link from './schemas/atoms/link'
import tag from './schemas/atoms/tag'
import { Vector3 } from './schemas/atoms/three'
import blockContent from './schemas/blockContent'
import project from './schemas/project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, tag, company, Vector3, blockContent, link, asset],
}
