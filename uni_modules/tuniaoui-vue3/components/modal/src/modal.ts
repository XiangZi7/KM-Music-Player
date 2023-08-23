import { buildProps } from '../../../utils'
import { ZIndex } from '../../../constants'

import type { ExtractPropTypes } from 'vue'

/**
 * @description Modal配置项
 */
export interface ModalOptions {
  /**
   * @description 内容
   */
  content: string
  /**
   * @description 标题
   */
  title?: string
  /**
   * @description 是否显示取消按钮
   */
  showCancel?: boolean
  /**
   * @description 取消按钮的文字
   */
  cancelText?: string
  /**
   * @description 取消按钮的样式
   */
  cancelStyle?: ModalBtnStyle
  /**
   * @description 确认按钮的文字
   */
  confirmText?: string
  /**
   * @description 确认按钮的样式
   */
  confirmStyle?: ModalBtnStyle
  /**
   * @description 是否显示遮罩
   */
  mask?: boolean
  /**
   * @description 是否允许点击遮罩关闭
   */
  maskClosable?: boolean
  /**
   * @description 点击取消按钮触发的回调函数，返回 false 或者返回 Promise 且被 reject 则取消关闭
   */
  cancel?: () => (Promise<boolean> | void) | boolean
  /**
   * @description 点击确认按钮触发的回调函数，返回 false 或者返回 Promise 且被 reject 则取消关闭
   */
  confirm?: () => (Promise<boolean> | void) | boolean
}

export interface ModalBtnStyle {
  /**
   * @description 按钮的背景色
   */
  bgColor?: string
  /**
   * @description 按钮的文字颜色
   */
  color?: string
}

export const modalProps = buildProps({
  /**
   * @description zIndex
   */
  zIndex: {
    type: Number,
    default: ZIndex.modal,
  },
})

export type ModalProps = ExtractPropTypes<typeof modalProps>
