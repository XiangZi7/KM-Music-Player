import { buildProps } from '../../../utils'
import { componentTypes } from '../../../constants'

import type { ExtractPropTypes } from 'vue'

export const loadingModes = ['semicircle', 'circle', 'flower'] as const

export const loadingProps = buildProps({
  /**
   * @description 显示加载状态
   */
  show: Boolean,
  /**
   * @description 加载动画
   */
  animation: Boolean,
  /**
   * @description 加载模式
   */
  mode: {
    type: String,
    values: loadingModes,
    default: 'circle',
  },
  /**
   * @description 加载颜色类型
   */
  type: {
    type: String,
    values: componentTypes,
    default: 'primary',
  },
  /**
   * @description 颜色，以tn开头则使用图鸟内置的颜色
   */
  color: String,
  /**
   * @description 加载动画大小
   */
  size: {
    type: [String, Number],
  },
  /**
   * @description 加载动画执行时间，单位s
   */
  duration: {
    type: [String, Number],
  },
  /**
   * @description 加载动画执行时间函数，仅mode为circle和semicircle时有效
   */
  timeFunction: String,
})

export type LoadingProps = ExtractPropTypes<typeof loadingProps>

export type LoadingMode = (typeof loadingModes)[number]
