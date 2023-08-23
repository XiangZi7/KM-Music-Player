import { buildProps } from '../../../utils'
import { propgressBaseProps } from '../../base/common-props/progress'

import type { ExtractPropTypes } from 'vue'

export const lineProgressProps = buildProps({
  ...propgressBaseProps,
  /**
   * @description 进度条高度
   */
  height: {
    type: [String, Number],
    default: 20,
  },
  /**
   * @description 是否显示条纹
   */
  stripe: Boolean,
  /**
   * @description 条纹是否有动画
   */
  stripeAnimated: {
    type: Boolean,
    default: true,
  },
})

export type LineProgressProps = ExtractPropTypes<typeof lineProgressProps>
