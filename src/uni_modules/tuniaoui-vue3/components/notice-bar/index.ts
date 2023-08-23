import { withNoopInstall } from '../../utils'
import NoticeBar from './src/notice-bar.vue'

export const TnNoticeBar = withNoopInstall(NoticeBar)
export default TnNoticeBar

export * from './src/notice-bar'
export type { TnNoticeBarInstance } from './src/instance'
