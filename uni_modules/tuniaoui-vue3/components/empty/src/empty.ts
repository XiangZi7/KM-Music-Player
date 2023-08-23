import { buildProps } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export const emptyMode = [
  'cart',
  'page',
  'search',
  'address',
  'network',
  'order',
  'coupon',
  'favor',
  'permission',
  'history',
  'message',
  'list',
  'data',
  'comment',
] as const

export const emptyProps = buildProps({
  /**
   * @description 空白提示类型
   */
  mode: {
    type: String,
    values: emptyMode,
    required: true,
  },
  /**
   * @description 内容颜色，以tn开头使用图鸟内置的颜色
   */
  color: String,
  /**
   * @description 内容尺寸，可以传递尺寸或者`sm` `lg` `xl`
   */
  size: String,
  /**
   * @description 是否显示提示
   */
  showTips: {
    type: Boolean,
    default: true,
  },
})

export type EmptyProps = ExtractPropTypes<typeof emptyProps>

export type EmptyMode = (typeof emptyMode)[number]
