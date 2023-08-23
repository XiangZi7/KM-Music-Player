import { buildProps } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export const scrollListProps = buildProps({
  /**
   * @description 是否显示指示器
   */
  indicator: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 指示器的宽度，单位 px
   */
  indicatorWidth: {
    type: Number,
    default: 40,
  },
  /**
   * @description 指示器滑块的宽度，单位 px
   */
  indicatorBlockWidth: {
    type: Number,
    default: 20,
  },
  /**
   * @description 指示器的背景颜色，以tn开头使用图鸟内置的颜色
   */
  indicatorColor: String,
  /**
   * @description 指示器滑块的背景颜色，以tn开头使用图鸟内置的颜色
   */
  indicatorBlockColor: String,
})

export const scrollListEmits = {
  /**
   * @description 滚动到左边时触发
   */
  'scroll-left': () => true,
  /**
   * @description 滚动到右边时触发
   */
  'scroll-right': () => true,
}

export type ScrollListProps = ExtractPropTypes<typeof scrollListProps>
export type ScrollListEmits = typeof scrollListEmits
