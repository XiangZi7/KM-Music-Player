import { CHANGE_EVENT, UPDATE_MODEL_EVENT, ZIndex } from '../../../constants'
import { buildProps, isBoolean, isString } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

const keyboardMode = ['number', 'digit', 'idcard', 'random', 'car'] as const
const carKeyboardLang = ['cn', 'en'] as const

export const keyboardProps = buildProps({
  /**
   * @description 键盘输入绑定的值
   */
  modelValue: {
    type: String,
    default: '',
  },
  /**
   * @description 是否显示键盘
   */
  show: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 键盘类型
   */
  mode: {
    type: String,
    values: keyboardMode,
    default: 'number',
  },
  /**
   * @description 车牌键盘中/英文模式，在 `mode` 为 `car` 时生效
   */
  carLang: {
    type: String,
    values: carKeyboardLang,
    default: 'cn',
  },
  /**
   * @description 点击按钮是否有震动效果
   */
  vibrate: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否允许长按删除删除内容
   */
  longPressDelete: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 禁止键盘输入
   */
  disabled: Boolean,
  /**
   * @description 点击遮罩关闭键盘
   */
  overlayCloseable: {
    type: Boolean,
    default: true,
  },
  /**
   * @description ZIndex
   */
  zIndex: {
    type: Number,
    default: ZIndex.popup,
  },
})

export const keyboardEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  'update:show': (value: boolean) => isBoolean(value),
  'update:carLangMode': (value: CarKeyboardLang) =>
    value === 'cn' || value === 'en',
  [CHANGE_EVENT]: (value: string) => isString(value),
  /**
   * @description 键盘关闭事件
   */
  close: () => true,
  /**
   * @description 退格事件
   */
  backspace: () => true,
  /**
   * @description 确认事件
   */
  confirm: () => true,
}

export type KeyboardProps = ExtractPropTypes<typeof keyboardProps>
export type KeyboardEmits = typeof keyboardEmits

export type KeyboardMode = (typeof keyboardMode)[number]
export type CarKeyboardLang = (typeof carKeyboardLang)[number]
