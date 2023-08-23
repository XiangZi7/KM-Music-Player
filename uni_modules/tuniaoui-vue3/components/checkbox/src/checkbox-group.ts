import { buildProps, definePropType, isArray } from '../../../utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
import { checkboxBaseProps } from '../../base/common-props/checkbox'

import type { ExtractPropTypes } from 'vue'
import type { CheckboxValueType } from '../../base/types/checkbox'

export type CheckboxGroupValueType = Exclude<CheckboxValueType, boolean>[]

export const checkboxGroupProps = buildProps({
  ...checkboxBaseProps,
  /**
   * @description 绑定的值
   */
  modelValue: {
    type: definePropType<CheckboxGroupValueType>(Array),
    default: () => [],
  },
  /**
   * @description 可被勾选的复选框最小值
   */
  min: Number,
  /**
   * @description 可被勾选的复选框最大值
   */
  max: Number,
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

export const checkboxGroupEmits = {
  [UPDATE_MODEL_EVENT]: (value: CheckboxGroupValueType) => isArray(value),
  [CHANGE_EVENT]: (value: CheckboxGroupValueType) => isArray(value),
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
export type CheckboxGroupEmits = typeof checkboxGroupEmits
