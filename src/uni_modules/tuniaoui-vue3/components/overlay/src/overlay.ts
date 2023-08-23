import { ZIndex } from '../../../constants'
import { buildProps, isBoolean } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export const overlayProps = buildProps({
  /**
   * @description 是否显示遮罩层
   */
  show: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 动画时间，单位毫秒
   */
  duration: {
    type: Number,
    default: 300,
  },
  /**
   * @description 遮罩层透明度，有效值0-1
   */
  opacity: {
    type: Number,
    default: 0.5,
  },
  /**
   * @description zIndex
   */
  zIndex: {
    type: Number,
    default: ZIndex.mask,
  },
})

export const overlayEmits = {
  'update:show': (value: boolean) => isBoolean(value),
  click: () => true,
}

export type OverlayProps = ExtractPropTypes<typeof overlayProps>
export type OverlayEmits = typeof overlayEmits
