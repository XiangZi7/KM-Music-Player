import { withNoopInstall } from '../../utils'
import Title from './src/title.vue'

export const TnTitle = withNoopInstall(Title)
export default TnTitle

export * from './src/title'
export type { TnTitleInstance } from './src/instance'
