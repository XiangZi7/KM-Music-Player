import { buildProps, definePropType, isArray, isNumber } from '../../../utils'
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '../../../constants'
import { useFormSizeProps } from '../../base/composables/use-component-common-props'

import type { ExtractPropTypes } from 'vue'
import type { Arrayable } from '../../../utils'

export const sliderModes = ['single', 'range'] as const

export type SliderValueType = Arrayable<number>

export const sliderProps = buildProps({
  /**
   * @description 滑块绑定的值
   */
  modelValue: {
    type: definePropType<SliderValueType>([Number, Array]),
    default: 0,
  },
  /**
   * @description 滑动条的尺寸
   */
  size: useFormSizeProps,
  /**
   * @description 滑块的尺寸
   */
  sliderBarSize: {
    type: [String, Number],
  },
  /**
   * @description 滑动条的高度
   */
  sliderHeight: {
    type: [String, Number],
  },
  /**
   * @description 激活时的颜色，以tn开头则使用图鸟内置的颜色只支持普通颜色
   */
  activeColor: {
    type: String,
    default: '',
  },
  /**
   * @description 非激活时的颜色，以tn开头则使用图鸟内置的颜色只支持普通颜色
   */
  inactiveColor: {
    type: String,
    default: '',
  },
  /**
   * @description 是否禁用
   */
  disabled: Boolean,
  /**
   * @description 滑动条的步进值
   */
  step: {
    type: Number,
    default: 1,
  },
  /**
   * @description 滑动条的最小值
   */
  min: {
    type: Number,
    default: 0,
  },
  /**
   * @description 滑动条的最大值
   */
  max: {
    type: Number,
    default: 100,
  },
  /**
   * @description 值发生修改时是否触发表单验证
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
})

export const sliderEmits = {
  [UPDATE_MODEL_EVENT]: (value: SliderValueType) =>
    isArray(value) || isNumber(value),
  [CHANGE_EVENT]: (value: SliderValueType) => isArray(value) || isNumber(value),
  [INPUT_EVENT]: (value: SliderValueType) => isArray(value) || isNumber(value),
}

export type SliderProps = ExtractPropTypes<typeof sliderProps>
export type SliderEmit = typeof sliderEmits

export type SliderMode = (typeof sliderModes)[number]
