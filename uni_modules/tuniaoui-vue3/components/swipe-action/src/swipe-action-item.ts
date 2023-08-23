import { buildProps, definePropType } from '../../../utils'
import { swipeActionBaseProps } from '../../base/common-props/swipe-action'

import type { ExtractPropTypes } from 'vue'

export type SwipeActionItemOptionItem = {
  /**
   * @description 菜单文字
   */
  text?: string
  /**
   * @description 菜单图标
   */
  icon?: string
  /**
   * @description 菜单字体颜色，以tn开头使用图鸟内置的颜色
   */
  textColor?: string
  /**
   * @description 菜单背景颜色，以tn开头使用图鸟内置的颜色
   */
  bgColor?: string
  /**
   * @description 菜单禁止点击
   */
  disabled?: boolean
  /**
   * @description 圆形菜单
   */
  round?: boolean
}
export type SwipeActionItemOption = SwipeActionItemOptionItem[]

export const swipeActionItemProps = buildProps({
  ...swipeActionBaseProps,
  /**
   * @description 菜单配置项
   */
  options: {
    type: definePropType<SwipeActionItemOption>(Array),
    default: () => [],
  },
  /**
   * @description 是否禁用
   */
  disabled: Boolean,
  /**
   * @description 滑动阈值，单位 px，大于该值则滑动动作生效
   */
  threshold: {
    type: Number,
    default: 20,
  },
})

export type SwipeActionItemProps = ExtractPropTypes<typeof swipeActionItemProps>
