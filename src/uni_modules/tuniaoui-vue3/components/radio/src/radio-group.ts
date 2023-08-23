import { buildProps, isBoolean, isNumber, isString } from '../../../utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
import { radioBaseProps } from '../../base/common-props/radio'

import type { ExtractPropTypes } from 'vue'

export const radioGroupProps = buildProps({
  ...radioBaseProps,
  /**
   * @description radio单选组绑定的值
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  /**
   * @description 每个选项独占一行
   */
  wrap: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 值发生修改时是否触发表单验证
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
})
export const radioGroupEmits = {
  [UPDATE_MODEL_EVENT]: (value: string | number | boolean) =>
    isString(value) || isNumber(value) || isBoolean(value),
  [CHANGE_EVENT]: (value: string | number | boolean) =>
    isString(value) || isNumber(value) || isBoolean(value),
}

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>
export type RadioGroupEmits = typeof radioGroupEmits
