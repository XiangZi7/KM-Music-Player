import { buildProps } from '../../../../utils'

export const subsectionBaseProps = buildProps({
  /**
   * @description 默认颜色，以tn开头使用图鸟内置的颜色
   */
  color: String,
  /**
   * @description 激活时的颜色，以tn开头使用图鸟内置的颜色
   */
  activeColor: String,
  /**
   * @description 是否禁用
   */
  disabled: Boolean,
} as const)
