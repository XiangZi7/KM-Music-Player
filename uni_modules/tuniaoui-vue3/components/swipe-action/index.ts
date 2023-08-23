import { withInstall, withNoopInstall } from '../../utils'
import SwipeAction from './src/swipe-action.vue'
import SwipeActionItem from './src/swipe-action-item.vue'

export const TnSwipeAction = withInstall(SwipeAction, {
  SwipeActionItem,
})
export default TnSwipeAction
export const TnSwipeActionItem = withNoopInstall(SwipeActionItem)

export * from './src/swipe-action'
export * from './src/swipe-action-item'

export type {
  TnSwipeActionInstance,
  TnSwipeActionItemInstance,
} from './src/instance'
