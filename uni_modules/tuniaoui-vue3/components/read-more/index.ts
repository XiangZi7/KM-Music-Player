import { withNoopInstall } from '../../utils'
import ReadMore from './src/read-more.vue'

export const TnReadMore = withNoopInstall(ReadMore)
export default TnReadMore

export * from './src/read-more'
export type { TnReadMoreInstance } from './src/instance'
