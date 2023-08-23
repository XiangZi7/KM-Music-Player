import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
import { buildProps, isNumber } from '../../../utils'
import { subsectionBaseProps } from '../../base/common-props/subsection'

import type { ExtractPropTypes } from 'vue'

export const subsectionMode = ['default', 'button'] as const

export const subsectionProps = buildProps({
  ...subsectionBaseProps,
  /**
   * @description 当前选中item索引的绑定值
   */
  modelValue: {
    type: Number,
    default: 0,
  },
  /**
   * @description 模式，`default`为默认模式，`button`为按钮模式
   */
  mode: {
    type: String,
    values: subsectionMode,
    default: 'default',
  },
  /**
   * @description 尺寸，默认可以设置 `sm`、`lg`、`xl`，也可以传入指定的尺寸设置字体的尺寸大小
   */
  size: String,
  /**
   * @description 圆角的值，只作用在最外层的两个选择器上，默认单位 `rpx`
   */
  radius: {
    type: String,
    default: '8',
  },
})

export const subsectionEmits = {
  [UPDATE_MODEL_EVENT]: (index: number) => isNumber(index),
  [CHANGE_EVENT]: (index: number) => isNumber(index),
}

export type SubsectionProps = ExtractPropTypes<typeof subsectionProps>
export type SubsectionEmits = typeof subsectionEmits

export type SubsectionMode = (typeof subsectionMode)[number]
