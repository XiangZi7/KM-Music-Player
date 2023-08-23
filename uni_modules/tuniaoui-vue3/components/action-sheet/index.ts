import { withNoopInstall } from '../../utils'
import ActionSheet from './src/action-sheet.vue'

export const TnActionSheet = withNoopInstall(ActionSheet)
export default TnActionSheet

export * from './src/action-sheet'
export type { TnActionSheetInstance } from './src/instance'
