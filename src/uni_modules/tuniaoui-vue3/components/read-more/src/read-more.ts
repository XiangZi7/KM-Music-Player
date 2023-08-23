import { buildProps, definePropType } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export type ReadMoreBeforeExpand = () => Promise<boolean> | boolean

export const readMoreProps = buildProps({
  /**
   * @description 默认是否展开
   */
  expand: Boolean,
  /**
   * @description 默认显示内容的高度，默认单位是 rpx
   */
  height: {
    type: Number,
    default: 250,
  },
  /**
   * @description 是否显示收起按钮
   */
  showFold: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 展开显示的文案
   */
  expandText: {
    type: String,
    default: '显示更多',
  },
  /**
   * @description 展开显示的图标
   */
  expandIcon: {
    type: String,
    default: 'down',
  },
  /**
   * @description 收起显示的文案
   */
  foldText: {
    type: String,
    default: '收起',
  },
  /**
   * @description 收起显示的图标
   */
  foldIcon: {
    type: String,
    default: 'up',
  },
  /**
   * @description 提示文案的颜色，使用tn开头则使用图鸟内置的颜色
   */
  tipColor: String,
  /**
   * @description 展开前回调
   */
  beforeExpand: {
    type: definePropType<ReadMoreBeforeExpand>(Function),
  },
})

export const readMoreEmits = {
  /**
   * @description 展开时触发
   */
  expand: () => true,
  /**
   * @description 收起时触发
   */
  fold: () => true,
}

export type ReadMoreProps = ExtractPropTypes<typeof readMoreProps>
export type ReadMoreEmits = typeof readMoreEmits
