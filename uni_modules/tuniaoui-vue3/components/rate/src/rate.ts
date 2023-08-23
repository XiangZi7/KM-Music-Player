import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
import { buildProps, definePropType, isNumber } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export type RateCustomData = {
  /**
   * @description 未选中时的图标
   */
  inactiveIcon?: string
  /**
   * @description 选中时的图标
   */
  activeIcon?: string
  /**
   * @description 未选中时的颜色
   */
  inactiveColor?: string
  /**
   * @description 选中时的颜色
   */
  activeColor?: string
}
export type RateCustomDataMap = Record<number, RateCustomData>

export const rateProps = buildProps({
  /**
   * @description 选中的数量
   */
  modelValue: {
    type: Number,
    default: 0,
  },
  /**
   * @description 最小值
   */
  min: {
    type: Number,
    default: 0,
  },
  /**
   * @description 最大值
   */
  max: {
    type: Number,
    default: 5,
  },
  /**
   * @description 是否允许半选
   */
  allowHalf: Boolean,
  /**
   * @description 是否只读
   */
  readonly: Boolean,
  /**
   * @description 尺寸大小，可选值为 `sm`、`lg`、`xl` 或者设置指定的尺寸
   */
  size: String,
  /**
   * @description 未选中时的图标
   */
  inactiveIcon: {
    type: String,
    default: 'star',
  },
  /**
   * @description 选中时的图标
   */
  activeIcon: {
    type: String,
    default: 'star-fill',
  },
  /**
   * @description 未选中时的颜色，以tn开头使用图鸟内置的颜色
   */
  inactiveColor: String,
  /**
   * @description 选中时的颜色，以tn开头使用图鸟内置的颜色
   */
  activeColor: String,
  /**
   * @description 每个图标的间距，默认单位 `rpx`
   */
  gutter: String,
  /**
   * @description 自定义图标信息
   */
  customData: {
    type: definePropType<RateCustomDataMap>(Object),
    default: () => ({}),
  },
  /**
   * @description 值发生修改时是否触发表单验证
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
})

export const rateEmits = {
  [UPDATE_MODEL_EVENT]: (value: number) => isNumber(value),
  [CHANGE_EVENT]: (value: number) => isNumber(value),
}

export type RateProps = ExtractPropTypes<typeof rateProps>
export type RateEmits = typeof rateEmits
