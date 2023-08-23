import { buildProps, isBoolean, isNumber, isString } from '../../../utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
import { checkboxBaseProps } from '../../base/common-props/checkbox'
import { useComponentCustomStyleProp } from '../../base/composables/use-component-common-props'

import type { ExtractPropTypes } from 'vue'
import type { CheckboxValueType } from '../../base/types/checkbox'

export const checkboxProps = buildProps({
  ...checkboxBaseProps,
  /**
   * @description 绑定的值
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  /**
   * @description 用于标记多个复选框时的唯一标识
   */
  label: {
    type: [String, Number],
  },
  /**
   * @description 用于标记当前复选框是否为不确定状态，一般用于全选
   */
  indeterminate: Boolean,
  /**
   * @description 复选框选中时的值
   */
  activeValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  /**
   * @description 复选框未选中时的值
   */
  inactiveValue: {
    type: [String, Number, Boolean],
    default: false,
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
   * @description 值发生修改时是否触发表单验证
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
})

export const checkboxEmits = {
  [UPDATE_MODEL_EVENT]: (value: CheckboxValueType) =>
    isString(value) || isNumber(value) || isBoolean(value),
  [CHANGE_EVENT]: (value: CheckboxValueType) =>
    isString(value) || isNumber(value) || isBoolean(value),
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
export type CheckboxEmits = typeof checkboxEmits
