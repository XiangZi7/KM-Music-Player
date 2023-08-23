import { buildProps } from '../../../../utils'

export const tabsBaseProps = buildProps({
  /**
   * @description 默认颜色，以tn开头时使用图鸟内置的颜色
   */
  color: String,
  /**
   * @description 选中颜色，以tn开头时使用图鸟内置的颜色
   */
  activeColor: String,
  /**
   * @description 字体大小
   */
  fontSize: String,
} as const)
