import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
import { buildProps, isBoolean, isString } from '../../../utils'
import { pickerBaseProps } from '../../base/common-props/picker'

import type { ExtractPropTypes } from 'vue'

export const dateTimePickerModes = [
  'year',
  'yearmonth',
  'date',
  'datetime',
  'time',
] as const

export const dateTimePickerProps = buildProps({
  ...pickerBaseProps,
  /**
   * @description 日期时间选择器绑定的值，支持的格式2019/12/27 12:00:00 2019-12-27 12:00:00
   */
  modelValue: {
    type: String,
    default: '',
  },
  /**
   * @description 显示隐藏日期时间选择器
   */
  open: Boolean,
  /**
   * @description 日期时间选择器类型
   */
  mode: {
    type: String,
    values: dateTimePickerModes,
    default: 'date',
  },
  /**
   * @description 最小可选时间，格式为 YYYY/MM/DD HH:mm:ss 例如 2023/01/04 12:00:00
   */
  minTime: String,
  /**
   * @description 最大可选时间，格式为 YYYY/MM/DD HH:mm:ss 例如 2023/10/01 23:30:00
   */
  maxTime: String,
})

export const dateTimePickerEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  [CHANGE_EVENT]: (value: string) => isString(value),
  'update:open': (value: boolean) => isBoolean(value),
  confirm: (value: string) => isString(value),
  cancel: () => true,
  close: () => true,
}

export type DateTimePickerProps = ExtractPropTypes<typeof dateTimePickerProps>
export type DateTimePickerEmits = typeof dateTimePickerEmits

export type DateTimePickerMode = (typeof dateTimePickerModes)[number]
