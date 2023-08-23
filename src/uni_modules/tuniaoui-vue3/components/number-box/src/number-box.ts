import { useComponentSizeProp } from '../../base/composables/use-component-common-props'
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '../../../constants'
import { buildProps, isNumber } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export const numberBoxProps = buildProps({
  /**
   * @description 步进器绑定的值
   */
  modelValue: {
    type: Number,
    default: 0,
  },
  /**
   * @description 步进器的尺寸
   */
  size: useComponentSizeProp,
  /**
   * @description 步进器的宽度
   */
  width: String,
  /**
   * @description 步进器的高度
   */
  height: String,
  /**
   * @description 文字大小
   */
  fontSize: String,
  /**
   * @description 步进器背景颜色，以tn开头则使用图鸟内置的颜色只支持普通颜色
   */
  bgColor: String,
  /**
   * @description 步进器字体颜色，以tn开头则使用图鸟内置的颜色只支持普通颜色
   */
  textColor: String,
  /**
   * @description 步进器的最小值
   */
  min: {
    type: Number,
    default: 0,
  },
  /**
   * @description 步进器的最大值
   */
  max: {
    type: Number,
    default: 100,
  },
  /**
   * @description 步进器的步长
   */
  step: {
    type: Number,
    default: 1,
  },
  /**
   * @description 禁止步进器操作
   */
  disabled: Boolean,
  /**
   * @description 禁止步进器输入
   */
  inputDisabled: Boolean,
  /**
   * @description 输入框与键盘的间距，单位px
   */
  inputSpacing: {
    type: Number,
    default: 20,
  },
  /**
   * @description 长按递增减
   */
  longPress: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 长按递增减的间隔时间，单位ms
   */
  longPressInterval: {
    type: Number,
    default: 250,
  },
  /**
   * @description 值发生修改时是否触发表单验证
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
})

export const numberBoxEmits = {
  [UPDATE_MODEL_EVENT]: (val: number) => isNumber(val),
  [CHANGE_EVENT]: (val: number) => isNumber(val),
  [INPUT_EVENT]: (val: number) => isNumber(val),
}

export type NumberBoxProps = ExtractPropTypes<typeof numberBoxProps>
export type NumberBoxEmits = typeof numberBoxEmits
