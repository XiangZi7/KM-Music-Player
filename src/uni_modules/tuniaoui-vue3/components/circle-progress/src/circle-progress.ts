import { buildProps } from '../../../utils'
import { propgressBaseProps } from '../../base/common-props/progress'

import type { ExtractPropTypes } from 'vue'

export const circleProgressProps = buildProps({
  ...propgressBaseProps,
  /**
   * @description 圆环的半径，单位 px，只支持传递固定的值
   */
  radius: {
    type: Number,
    default: 50,
  },
  /**
   * @description 圆环的宽度，单位 px，只支持传递固定的值
   */
  ringWidth: {
    type: Number,
    default: 7,
  },
})

export type CircleProgressProps = ExtractPropTypes<typeof circleProgressProps>
