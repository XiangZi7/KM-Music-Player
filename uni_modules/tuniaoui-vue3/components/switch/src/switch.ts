import {
  buildProps,
  definePropType,
  isBoolean,
  isNumber,
  isString,
} from '../../../utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
import {
  useComponentCustomStyleProp,
  useFormSizeProps,
} from '../../base/composables/use-component-common-props'

import type { ExtractPropTypes } from 'vue'

export const switchShapes = ['square', 'round'] as const

export type switchValueType = string | number | boolean

export const switchProps = buildProps({
  /**
   * @description 状态绑定的值
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  /**
   * @description 按钮形状
   */
  shape: {
    type: String,
    values: switchShapes,
    default: 'round',
  },
  /**
   * @description 按钮尺寸
   */
  size: useFormSizeProps,
  /**
   * @description 按钮的宽度
   */
  width: {
    type: [String, Number],
  },
  /**
   * @description 自定义样式
   */
  customStyle: useComponentCustomStyleProp,
  /**
   * @description 自定义类名
   */
  customClass: String,
  /**
   * @description 是否禁用
   */
  disabled: Boolean,
  /**
   * @description 是否显示加载动画
   */
  loading: Boolean,
  /**
   * @description 未选中时的颜色，以tn开头则使用图鸟内置的颜色只支持普通颜色
   */
  inactiveColor: String,
  /**
   * @description 选中时的颜色，以tn开头则使用图鸟内置的颜色只支持普通颜色
   */
  activeColor: String,
  /**
   * @description 未选中时显示的文本，如果设置了该值，则不显示图标
   */
  inactiveText: String,
  /**
   * @description 选中时显示的文本，如果设置了该值，则不显示图标
   */
  activeText: String,
  /**
   * @description 未选中时显示的图标
   */
  inactiveIcon: String,
  /**
   * @description 选中时显示的图标
   */
  activeIcon: String,
  /**
   * @description 未选中时的值
   */
  inactiveValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  /**
   * @description 选中时的值
   */
  activeValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  /**
   * @description 值发生修改时是否触发表单验证
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 状态改变前的钩子， 返回 false 或者返回 Promise 且被 reject 则停止切换
   */
  beforeChange: {
    type: definePropType<() => Promise<boolean> | boolean>(Function),
  },
})

export const switchEmits = {
  [UPDATE_MODEL_EVENT]: (value: switchValueType) =>
    isString(value) || isNumber(value) || isBoolean(value),
  [CHANGE_EVENT]: (value: switchValueType) =>
    isString(value) || isNumber(value) || isBoolean(value),
}

export type SwitchProps = ExtractPropTypes<typeof switchProps>
export type SwitchEmits = typeof switchEmits

export type SwitchShape = (typeof switchShapes)[number]
