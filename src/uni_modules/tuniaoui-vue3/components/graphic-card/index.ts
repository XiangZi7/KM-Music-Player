import { withNoopInstall } from '../../utils'
import graphicCard from './src/graphic-card.vue'

export const TnGraphicCard = withNoopInstall(graphicCard)
export default TnGraphicCard

export * from './src/graphic-card'
export type { TnGraphicCardInstance } from './src/instance'
