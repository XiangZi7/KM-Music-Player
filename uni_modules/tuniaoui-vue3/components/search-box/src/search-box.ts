import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
import { buildProps, isString } from '../../../utils'
import { useComponentSizeProp } from '../../base/composables/use-component-common-props'

import type { ExtractPropTypes } from 'vue'

export const searchBoxShape = ['square', 'round'] as const
export const searchBoxAlign = ['left', 'center', 'right'] as const

export const searchBoxProps = buildProps({
  /**
   * @description 搜索框绑定的值
   */
  modelValue: {
    type: String,
    default: '',
  },
  /**
   * @description 搜索框的占位符
   */
  placeholder: {
    type: String,
    default: '请输入搜索内容',
  },
  /**
   * @description 搜索框占位符旁边的图标
   */
  placeholderIcon: {
    type: String,
    default: 'search',
  },
  /**
   * @description 搜索框的形状
   */
  shape: {
    type: String,
    values: searchBoxShape,
    default: 'square',
  },
  /**
   * @description 搜索框的尺寸，可以设置 `sm`、`lg`、`xl`
   */
  size: useComponentSizeProp,
  /**
   * @description 搜索框文字的颜色，以tn开头使用图鸟的颜色
   */
  textColor: String,
  /**
   * @description 搜索框占位文字颜色，以tn开头使用图鸟的颜色
   */
  placeholderColor: String,
  /**
   * @description 搜索框文字对齐方式
   */
  textAlign: {
    type: String,
    values: searchBoxAlign,
    default: 'left',
  },
  /**
   * @description 显示边框
   */
  border: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 边框颜色
   */
  borderColor: String,
  /**
   * @description 获取搜索框焦点
   */
  focus: Boolean,
  /**
   * @description 是否禁用搜索框
   */
  disabled: Boolean,
  /**
   * @description 是否显示清除按钮
   */
  clearable: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否显示搜索按钮
   */
  searchButton: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 搜索按钮的文字
   */
  searchButtonText: {
    type: String,
    default: '搜 索',
  },
  /**
   * @description 搜索按钮字体颜色，以tn开头使用图鸟的颜色
   */
  searchButtonTextColor: String,
  /**
   * @description 搜索按钮背景颜色，以tn开头使用图鸟的颜色
   */
  searchButtonBgColor: String,
  /**
   * @description 输入是否节流
   */
  throllte: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 节流延迟时间，单位毫秒
   */
  throllteTime: {
    type: Number,
    default: 1000,
  },
})

export const searchBoxEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  [CHANGE_EVENT]: (value: string) => isString(value),
  /**
   * @description 搜索框输入时触发
   */
  input: (value: string) => isString(value),
  /**
   * @description 点击搜索框时触发
   */
  click: () => true,
  /**
   * @description 聚焦搜索输入框时触发
   */
  focus: () => true,
  /**
   * @description 搜索输入框失去焦点时触发
   */
  blur: () => true,
  /**
   * @description 点击搜索按钮时触发
   */
  search: (value: string) => isString(value),
  /**
   * @description 点击清除按钮时触发
   */
  clear: () => true,
}

export type SearchBoxProps = ExtractPropTypes<typeof searchBoxProps>
export type SearchBoxEmits = typeof searchBoxEmits

export type SearchBoxShape = (typeof searchBoxShape)[number]
