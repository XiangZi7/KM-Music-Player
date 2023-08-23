import { withNoopInstall } from '../../utils'
import Tag from './src/tag.vue'

export const TnTag = withNoopInstall(Tag)
export default TnTag

export * from './src/tag'
export type { TnTagInstance } from './src/instance'
