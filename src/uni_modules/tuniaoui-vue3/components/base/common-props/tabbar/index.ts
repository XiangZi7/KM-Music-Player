import { buildProps } from '../../../../utils'

export const tabbarBaseProps = buildProps({
  /**
   * @description 未选中时的颜色
   */
  inactiveColor: String,
  /**
   * @description 选中时的颜色
   */
  activeColor: String,
  /**
   * @description 图标大小
   */
  iconSize: String,
  /**
   * @description 文字大小
   */
  fontSize: String,
} as const)
