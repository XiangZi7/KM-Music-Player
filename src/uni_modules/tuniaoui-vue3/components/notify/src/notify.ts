import { ZIndex } from '../../../constants'
import { buildProps } from '../../../utils'

import type { ExtractPropTypes } from 'vue'
import type { ComponentType } from '../../../constants'

export const notifyShowPosition = ['', 'top', 'center', 'bottom'] as const
export type NotifyShowPosition = (typeof notifyShowPosition)[number]

/**
 * @description notify options配置项
 */
export interface NotifyOptions {
  /**
   * @description 消息内容
   */
  msg: string
  /**
   * @description 消息类型
   */
  type?: Omit<ComponentType, ''>
  /**
   * @description 通知的位置
   */
  position?: NotifyShowPosition
  /**
   * @description 背景颜色
   */
  bgColor?: string
  /**
   * @description 文字颜色
   */
  textColor?: string
  /**
   * @description 自动关闭时间
   */
  duration?: number
}

export const notifyProps = buildProps({
  /**
   * @description 距离顶部的距离，防止使用了自定义顶部导航栏后，notify 被遮挡，单位为 px
   */
  offsetTop: {
    type: Number,
    default: 0,
  },
  /**
   * @description ZIndex
   */
  zIndex: {
    type: Number,
    default: ZIndex.notify,
  },
})

export type NotifyProps = ExtractPropTypes<typeof notifyProps>
