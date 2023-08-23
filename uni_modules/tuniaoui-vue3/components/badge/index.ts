import { withNoopInstall } from '../../utils'

import Badge from './src/badge.vue'

export const TnBadge = withNoopInstall(Badge)
export default TnBadge

export * from './src/badge'
export type { BadgeInstance } from './src/instance'
