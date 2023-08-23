import { buildProps, definePropType, isObject, isString } from '../../../utils'
import {
  useComponentCustomStyleProp,
  useFormSizeProps,
} from '../../base/composables/use-component-common-props'
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '../../../constants'

import type { ExtractPropTypes } from 'vue'

const inputTypes = [
  'text',
  'number',
  'idcard',
  'digit',
  'textarea',
  'password',
  'select',
] as const

const inputConfirmTypes = ['send', 'search', 'next', 'go', 'done'] as const

export const inputProps = buildProps({
  /**
   * @description 绑定的值
   */
  modelValue: {
    type: definePropType<string | number | null | undefined>([
      String,
      Number,
      Object,
    ]),
    default: '',
  },
  /**
   * @description 输入框尺寸
   */
  size: useFormSizeProps,
  /**
   * @description 输入框高度
   */
  height: {
    type: [String, Number],
  },
  /**
   * @description 是否禁用
   */
  disabled: Boolean,
  /**
   * @description 输入框类型
   */
  type: {
    type: String,
    values: inputTypes,
    default: 'text',
  },
  /**
   * @description 输入框占位文本
   */
  placeholder: String,
  /**
   * @description 文字对齐方式
   */
  textAlign: {
    type: String,
    values: ['left', 'center', 'right'],
    default: 'left',
  },
  /**
   * @description 输入框占位文本的样式
   */
  placeholderStyle: useComponentCustomStyleProp,
  /**
   * @description 是否显示边框
   */
  border: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 边框颜色
   */
  borderColor: {
    type: String,
    default: 'tn-gray-disabled',
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
   * @description 最大可输入长度，设置为 -1 的时候不限制最大长度
   */
  maxlength: {
    type: Number,
    default: -1,
  },
  /**
   * @description 根据内容自动调整高度，仅在 textarea 模式下生效，如果设置了 height 则优先级最高
   */
  autoHeight: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 设置键盘右下角按钮的文字，仅在使用系统键盘时生效
   */
  confirmType: {
    type: String,
    values: inputConfirmTypes,
    default: 'done',
  },
  /**
   * @description 获取焦点
   */
  focus: Boolean,
  /**
   * @description 是否展示清除按钮
   */
  clearable: Boolean,
  /**
   * @description 是否显示切换密码显示/隐藏按钮，仅在 type="password" 时生效
   */
  showPassword: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 指定光标与键盘的距离，单位 px
   */
  cursorSpacing: {
    type: Number,
    default: 0,
  },
  /**
   * @description 光标起始位置，自动聚集时有效，需与selection-end搭配使用
   */
  selectionStart: {
    type: Number,
    default: -1,
  },
  /**
   * @description 光标结束位置，自动聚集时有效，需与selection-start搭配使用
   */
  selectionEnd: {
    type: Number,
    default: -1,
  },
  /**
   * @description 是否展示键盘上方带有”完成“按钮那一栏
   */
  showConfirmBar: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 显示输入框右图标
   */
  rightIcon: String,
  /**
   * @description 自动去除两端空格
   */
  trim: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 输入时是否触发表单验证
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
})
export const inputEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  /**
   * @description 输入框输入内容时触发
   */
  [INPUT_EVENT]: (value: string) => isString(value),
  /**
   * @description 输入框内容变化时触发
   */
  [CHANGE_EVENT]: (value: string) => isString(value),
  /**
   * @description 输入框点击时触发
   */
  click: () => true,
  /**
   * @description 输入框聚焦时触发
   */
  focus: (e: InputFocusEvent) => isObject(e),
  /**
   * @description 输入框失去焦点时触发
   */
  blur: (e: InputBlurEvent) => isObject(e),
  /**
   * @description 点击清除按钮时触发
   */
  clear: () => true,
  /**
   * @description 点击键盘右下角按钮时触发
   */
  confirm: (value: string) => isString(value),
}

export type InputProps = ExtractPropTypes<typeof inputProps>
export type InputEmit = typeof inputEmits

export type InputType = (typeof inputTypes)[number]
export type InputConfirmType = (typeof inputConfirmTypes)[number]

/**
 * @description 输入框聚焦事件
 */
export interface InputFocusEvent {
  detail: {
    /**
     * @description 输入框内容
     */
    value: string
    /**
     * @description 键盘高度
     */
    height: number
  }
}

/**
 * @description 输入框失去焦点事件
 */
export interface InputBlurEvent {
  detail: {
    /**
     * @description 输入框内容
     */
    value: string
  }
}
