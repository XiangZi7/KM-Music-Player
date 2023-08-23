import { ZIndex } from '../../../constants'
import { buildProps, isBoolean } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export const stickyProps = buildProps({
  /**
   * @description 是否开启粘性布局
   */
  enabled: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 粘性布局的距离顶部的距离
   */
  offsetTop: {
    type: Number,
    default: 0,
  },
  /**
   * @description ZIndex
   */
  zIndex: {
    type: Number,
    default: ZIndex.sticky,
  },
})

export const stickyEmits = {
  /**
   * @description 粘性布局状态变化时触发
   */
  change: (fixed: boolean) => isBoolean(fixed),
}

export type StickyProps = ExtractPropTypes<typeof stickyProps>
export type StickyEmits = typeof stickyEmits
