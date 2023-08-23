import { buildProps } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export const baseStepProps = buildProps({
  /**
   * @description 默认颜色，以tn开头使用图鸟内置颜色
   */
  color: String,
  /**
   * @description 激活时颜色，以tn开头使用图鸟内置颜色
   */
  activeColor: String,
  /**
   * @description 禁止点击
   */
  disabled: Boolean,
} as const)

export const stepProps = buildProps({
  ...baseStepProps,
  /**
   * @description 标题
   */
  title: String,
  /**
   * @description 默认的图标
   */
  icon: String,
  /**
   * @description 激活时的图标
   */
  activeIcon: String,
})

export const stepEmits = {
  /**
   * @description 点击事件
   */
  click: () => true,
}

export type StepProps = ExtractPropTypes<typeof stepProps>
export type StepEmits = typeof stepEmits
