import { buildProps } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export const titleModes = [
  'normal',
  'vLine',
  'dot',
  'hLine',
  'subTitle',
  'transparent',
] as const

export const titleAlign = ['left', 'center', 'right'] as const

export const titleProps = buildProps({
  /**
   * @description 标题内容
   */
  title: String,
  /**
   * @description 子标题内容，设置 mode 为 subTitle 时生效
   */
  subTitle: String,
  /**
   * @description 标题模式
   */
  mode: {
    type: String,
    values: titleModes,
    default: 'normal',
  },
  /**
   * @description 标题大小，内置`sm`、`lg`、`xl`，同时也可以传递指定的尺寸
   */
  size: String,
  /**
   * @description 标题对齐方式
   */
  align: {
    type: String,
    values: titleAlign,
    default: 'left',
  },
  /**
   * @description 标题颜色，以tn开头则使用图鸟内置的颜色
   */
  color: String,
  /**
   * @description 辅助元素颜色，以tn开头则使用图鸟内置的颜色
   */
  assistColor: String,
})

export const titleEmits = {
  /**
   * @description 点击事件
   */
  click: () => true,
}

export type TitleProps = ExtractPropTypes<typeof titleProps>
export type TitleEmits = typeof titleEmits

export type TitleMode = (typeof titleModes)[number]
