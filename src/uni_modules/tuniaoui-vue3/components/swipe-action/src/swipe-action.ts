import { buildProps, isNumber } from '../../../utils'
import { swipeActionBaseProps } from '../../base/common-props/swipe-action'

import type { ExtractPropTypes } from 'vue'

export const swipeActionProps = buildProps({
  ...swipeActionBaseProps,
  /**
   * @description 只允许一个item处于打开状态
   */
  exclusive: {
    type: Boolean,
    default: true,
  },
})

export const swipeActionEmits = {
  /**
   * @description 打开时触发
   */
  open: (index: number) => isNumber(index),
  /**
   * @description 点击选项时触发
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  select: (index: number, optionIndex: number) => true,
}

export type SwipeActionProps = ExtractPropTypes<typeof swipeActionProps>
export type SwipeActionEmits = typeof swipeActionEmits
