import { ZIndex } from '../../../constants'
import { buildProps, definePropType, isNumber } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export interface BubbleBoxOptionItem {
  /**
   * @description 内容
   */
  text: string
  /**
   * @description 图标
   */
  icon?: string
  /**
   * @description 气泡弹出框文字颜色，以tn开头使用图鸟内置的颜色
   */
  textColor?: string
  /**
   * @description 禁止点击
   */
  disabled?: boolean
}
export type BubbleBoxOption = BubbleBoxOptionItem[]

export const bubbleBoxPosition = ['top', 'bottom', 'left', 'right'] as const

export const bubbleBoxProps = buildProps({
  /**
   * @description 气泡弹出框选项数据
   */
  options: {
    type: definePropType<BubbleBoxOption>(Array),
    default: () => [],
  },
  /**
   * @description 气泡弹出框位置
   */
  position: {
    type: String,
    values: bubbleBoxPosition,
    default: 'top',
  },
  /**
   * @description 气泡弹出框宽度，默认单位 rpx
   */
  width: String,
  /**
   * @description 气泡弹出框高度，默认单位 rpx
   */
  height: String,
  /**
   * @description 气泡弹出框背景颜色，以tn开头使用图鸟内置的颜色
   */
  bgColor: String,
  /**
   * @description 气泡弹出框文字颜色，以tn开头使用图鸟内置的颜色
   */
  textColor: String,
  /**
   * @description 选项的内边距
   */
  optionItemPadding: String,
  /**
   * @description 是否禁止点击气泡弹出框选项
   */
  disabled: Boolean,
  /**
   * @description 点击选项后自动关闭气泡弹出框
   */
  autoClose: {
    type: Boolean,
    default: true,
  },
  /**
   * @description ZIndex
   */
  zIndex: {
    type: Number,
    default: ZIndex.bubble,
  },
})

export const bubbleBoxEmits = {
  /**
   * @description 气泡框打开事件
   */
  open: () => true,
  /**
   * @description 气泡框关闭事件
   */
  close: () => true,
  /**
   * @description 气泡框选项点击事件
   */
  click: (index: number) => isNumber(index),
}

export type BubbleBoxProps = ExtractPropTypes<typeof bubbleBoxProps>
export type BubbleBoxEmits = typeof bubbleBoxEmits

export type BubbleBoxPosition = (typeof bubbleBoxPosition)[number]
