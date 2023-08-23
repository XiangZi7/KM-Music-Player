import { buildProps } from '../../../../utils'

export const stepsBaseProps = buildProps({
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
