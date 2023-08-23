import { buildProps, isBoolean, isNumber, isString } from '../../../utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
import { radioBaseProps } from '../../base/common-props/radio'
import { useComponentCustomStyleProp } from '../../base/composables/use-component-common-props'

import type { ExtractPropTypes } from 'vue'

export const radioProps = buildProps({
  ...radioBaseProps,
  /**
   * @description radio单选框绑定的值
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  /**
   * @description radio单选框的值，在使用单选组时，radio的值就是label
   */
  label: {
    type: [String, Number, Boolean],
    default: '',
  },
  /**
   * @description 自定义样式
   */
  customStyle: useComponentCustomStyleProp,
  /**
   * @description 自定义类名
   */
  customClass: String,
})
export const radioEmits = {
  [UPDATE_MODEL_EVENT]: (value: string | number | boolean) =>
    isString(value) || isNumber(value) || isBoolean(value),
  [CHANGE_EVENT]: (value: string | number | boolean) =>
    isString(value) || isNumber(value) || isBoolean(value),
}

export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioEmits = typeof radioEmits
