import { withInstall, withNoopInstall } from '../../utils'
import Subsection from './src/subsection.vue'
import SubsectionItem from './src/subsection-item.vue'

export const TnSubsection = withInstall(Subsection, {
  SubsectionItem,
})
export default TnSubsection
export const TnSubsectionItem = withNoopInstall(SubsectionItem)

export * from './src/subsection'
export * from './src/subsection-item'
export * from './src/types'
export type {
  TnSubsectionInstance,
  TnSubsectionItemInstance,
} from './src/instance'
