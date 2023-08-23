import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
import {
  buildProps,
  definePropType,
  isArray,
  isBoolean,
  isNumber,
  isString,
} from '../../../utils'
import { pickerBaseProps } from '../../base/common-props/picker'

import type { ExtractPropTypes } from 'vue'
import type { Arrayable } from '../../../utils'

export type PickerValueType = Arrayable<string | number>
export type PickerDataType = string | number | object
export type PickerData = Arrayable<Array<PickerDataType> | object>

export const PickerModes = ['signle', 'multiple', 'cascade'] as const

export const pickerProps = buildProps({
  ...pickerBaseProps,
  /**
   * @description picker绑定的值
   */
  modelValue: {
    type: definePropType<PickerValueType>([String, Number, Array]),
    default: '',
  },
  /**
   * @description 显示picker选项弹框
   */
  open: Boolean,
  /**
   * @description picker选项的数据
   */
  data: {
    type: definePropType<PickerData>([Array]),
    default: () => [],
  },
  /**
   * @description picker选项的数据label属性名
   */
  labelKey: {
    type: String,
    default: 'label',
  },
  /**
   * @description picker选项的数据value属性名
   */
  valueKey: {
    type: String,
    default: 'value',
  },
  /**
   * @description picker选项的数据children属性名, 在级联选择器模式下生效
   */
  childrenKey: {
    type: String,
    default: 'children',
  },
})

export const pickerEmits = {
  [UPDATE_MODEL_EVENT]: (value: PickerValueType) =>
    isString(value) || isNumber(value) || isArray(value),
  'update:open': (value: boolean) => isBoolean(value),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [CHANGE_EVENT]: (value: PickerValueType, index: number, item: any) => true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  confirm: (value: PickerValueType, item: any) => true,
  cancel: () => true,
  close: () => true,
}

export type PickerProps = ExtractPropTypes<typeof pickerProps>
export type PickerEmits = typeof pickerEmits

export type PickerMode = (typeof PickerModes)[number]
