import { buildProps } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export const waterFallModes = ['normal', 'calc'] as const

export const waterFallProps = buildProps({
  /**
   * @description 列表数据
   */
  data: {
    type: Array,
    default: () => [],
  },
  /**
   * @description 瀑布流模式
   */
  mode: {
    type: String,
    values: waterFallModes,
    default: 'normal',
  },
})

export type WaterFallProps = ExtractPropTypes<typeof waterFallProps>

export type WaterFallMode = (typeof waterFallModes)[number]
