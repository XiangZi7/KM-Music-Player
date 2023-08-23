import { buildProps } from '../../../../utils'

export const swipeActionBaseProps = buildProps({
  /**
   * @description 自动关闭菜单
   */
  autoClose: {
    type: Boolean,
    default: true,
  },
} as const)
